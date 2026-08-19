'use client'

import Link from 'next/link'
import type { Product } from '@/lib/types'
import { productCategories } from '@/lib/data/products'
import { isWeightProduct } from '@/lib/products/display'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ProductPrice } from '@/components/catalogo/ProductPrice'

interface ProductCardProps {
  product: Product
  recommendedForPet?: string
}

const categoryLabels = Object.fromEntries(
  productCategories.map((c) => [c.value, c.label])
)

export function ProductCard({ product, recommendedForPet }: ProductCardProps) {
  return (
    <Card padding="sm" className="flex h-full flex-col overflow-hidden p-0">
      <Link href={`/catalogo/${product.id}`} className="flex h-full flex-col">
        <div className="relative aspect-square bg-background">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-4"
          />
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            <Badge variant="outline">{categoryLabels[product.category]}</Badge>
            {isWeightProduct(product) && (
              <Badge variant="secondary">A granel</Badge>
            )}
            {product.promoPercent && product.promoPercent > 0 && (
              <Badge variant="secondary">-{product.promoPercent}%</Badge>
            )}
          </div>
          {recommendedForPet && (
            <div className="absolute bottom-2 left-2 right-2">
              <Badge variant="primary" className="max-w-full truncate">
                Para {recommendedForPet}
              </Badge>
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-3 pt-2">
          <h3 className="line-clamp-2 font-heading text-sm font-semibold text-ink">
            {product.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted">{product.brand}</p>
          <div className="mt-2">
            <ProductPrice product={product} size="sm" />
          </div>
        </div>
      </Link>
      <div className="px-3 pb-3">
        <Link href={`/catalogo/${product.id}`}>
          <Button size="sm" className="w-full">
            Ver produto
          </Button>
        </Link>
      </div>
    </Card>
  )
}
