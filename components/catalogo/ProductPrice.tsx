import { cn } from '@/lib/utils'
import type { Product } from '@/lib/types'
import {
  formatOriginalPriceLabel,
  formatProductPriceLabel,
  getPromoPercent,
  hasPromo,
} from '@/lib/products/display'

interface ProductPriceProps {
  product: Product
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-2xl',
}

export function ProductPrice({ product, size = 'md' }: ProductPriceProps) {
  const original = formatOriginalPriceLabel(product)

  return (
    <div>
      {original && (
        <p className="text-xs text-muted line-through">{original}</p>
      )}
      <p className={cn('font-heading font-bold text-secondary', sizes[size])}>
        {formatProductPriceLabel(product)}
        {hasPromo(product) && (
          <span className="ml-2 align-middle text-xs font-semibold text-secondary">
            -{getPromoPercent(product)}%
          </span>
        )}
      </p>
    </div>
  )
}
