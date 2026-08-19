import type { Product } from '@/lib/types'
import { ProductCard } from '@/components/catalogo/ProductCard'

interface ProductGridProps {
  products: Product[]
  recommendedForPet?: string
}

export function ProductGrid({ products, recommendedForPet }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-card border border-dashed border-border bg-surface p-10 text-center">
        <p className="font-heading text-lg font-semibold text-ink">Nenhum produto encontrado</p>
        <p className="mt-2 text-sm text-muted">Tente ajustar os filtros ou a busca.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          recommendedForPet={recommendedForPet}
        />
      ))}
    </div>
  )
}
