import type { Product } from '@/lib/types'
import { ProductCard } from '@/components/catalogo/ProductCard'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
        <p className="text-lg font-semibold text-gray-700">Nenhum produto encontrado</p>
        <p className="mt-2 text-sm text-gray-500">
          Tente ajustar os filtros ou a busca.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
