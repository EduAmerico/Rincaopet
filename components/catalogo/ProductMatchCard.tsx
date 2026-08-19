'use client'

import Link from 'next/link'
import type { ProductMatch } from '@/lib/types'
import { isWeightProduct } from '@/lib/products/display'
import { productCategories } from '@/lib/data/products'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProductPrice } from '@/components/catalogo/ProductPrice'

interface ProductMatchCardProps {
  match: ProductMatch
  petName: string
}

const categoryLabels = Object.fromEntries(
  productCategories.map((c) => [c.value, c.label])
)

export function ProductMatchCard({ match, petName }: ProductMatchCardProps) {
  const { product } = match

  return (
    <Card padding="sm" className="flex h-full w-[220px] shrink-0 flex-col overflow-hidden p-0 sm:w-[240px]">
      <Link href={`/catalogo/${product.id}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square bg-background">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-4"
          />
          {isWeightProduct(product) && (
            <div className="absolute left-2 top-2 flex flex-wrap gap-1">
              <Badge variant="secondary">A granel</Badge>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-3">
          <Badge variant="outline" className="mb-2 w-fit">
            {categoryLabels[product.category]}
          </Badge>
          <h3 className="line-clamp-2 font-heading text-sm font-semibold text-ink">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted">{product.brand}</p>
          <div className="mt-2">
            <ProductPrice product={product} size="sm" />
          </div>
          <p className="mt-1 text-[11px] text-muted">Boa opção para {petName}</p>
        </div>
      </Link>
      <div className="px-3 pb-3">
        <Link href={`/catalogo/${product.id}`}>
          <Button variant="primary" size="sm" className="w-full">
            Ver detalhes
          </Button>
        </Link>
      </div>
    </Card>
  )
}
