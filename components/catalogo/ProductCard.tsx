import Link from 'next/link'
import type { Product } from '@/lib/types'
import { productCategories } from '@/lib/data/products'
import {
  formatProductPriceLabel,
  isWeightProduct,
} from '@/lib/products/display'
import { Card } from '@/components/ui/Card'

interface ProductCardProps {
  product: Product
}

const categoryLabels = Object.fromEntries(
  productCategories.map((c) => [c.value, c.label])
)

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/catalogo/${product.id}`}>
      <Card className="flex h-full flex-col transition hover:border-pet-green hover:shadow-md">
        <div className="mb-4 flex h-32 items-center justify-center rounded-xl bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="h-20 w-20 object-contain"
          />
        </div>
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="inline-flex rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-pet-green">
            {categoryLabels[product.category]}
          </span>
          {isWeightProduct(product) && (
            <span className="inline-flex rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-pet-orange">
              A granel
            </span>
          )}
        </div>
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
        <p className="mt-auto pt-4 text-lg font-bold text-pet-orange">
          {formatProductPriceLabel(product)}
        </p>
      </Card>
    </Link>
  )
}
