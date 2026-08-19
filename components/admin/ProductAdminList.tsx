'use client'

import Link from 'next/link'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { productCategories } from '@/lib/data/products'
import { formatProductPriceLabel, hasPromo, getPromoPercent } from '@/lib/products/display'
import { useProducts } from '@/lib/hooks/useProducts'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { useMemo, useState } from 'react'

const categoryLabels = Object.fromEntries(
  productCategories.map((category) => [category.value, category.label])
)

export function ProductAdminList() {
  const { products, loaded, deleteProduct, restoreCatalog } = useProducts()
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim()
    if (!query) return products
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
    )
  }, [products, search])

  if (!loaded) return <p className="text-muted">Carregando produtos...</p>

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">Produtos</h1>
          <p className="mt-1 text-sm text-muted">{products.length} item(ns) no catálogo</p>
        </div>
        <Link href="/admin/produtos/novo">
          <Button variant="secondary">
            <Plus className="h-4 w-4" />
            Novo produto
          </Button>
        </Link>
      </div>

      <div className="mb-4">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome ou marca"
        />
      </div>

      <div className="space-y-3">
        {filtered.map((product) => (
          <Card key={product.id} className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-chip bg-background">
              <img src={product.image} alt="" className="h-full w-full object-contain p-1" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-heading font-semibold text-ink">{product.name}</h2>
                {hasPromo(product) && (
                  <Badge variant="secondary">-{getPromoPercent(product)}%</Badge>
                )}
                {product.active === false && <Badge variant="muted">Oculto</Badge>}
              </div>
              <p className="text-sm text-muted">
                {product.brand} · {categoryLabels[product.category]} ·{' '}
                {formatProductPriceLabel(product)}
              </p>
            </div>
            <div className="flex shrink-0 gap-1">
              <Link href={`/admin/produtos/${product.id}`}>
                <Button variant="outline" size="sm" aria-label="Editar">
                  <Pencil className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Excluir"
                onClick={() => {
                  if (confirm(`Excluir ${product.name}?`)) deleteProduct(product.id)
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted">Nenhum produto encontrado.</p>
      )}

      <button
        type="button"
        className="mt-8 text-xs text-muted underline"
        onClick={() => {
          if (confirm('Isso substitui o catálogo atual pelo catálogo inicial. Continuar?')) {
            restoreCatalog()
          }
        }}
      >
        Restaurar catálogo inicial
      </button>
    </div>
  )
}
