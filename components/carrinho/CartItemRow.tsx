'use client'

import { getManagedProductById } from '@/lib/catalog/productRepository'
import { calculateLineTotal } from '@/lib/cart/pricing'
import { formatCartItemQuantity } from '@/lib/products/display'
import type { CartItem } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface CartItemRowProps {
  item: CartItem
  onRemove: () => void
}

export function CartItemRow({ item, onRemove }: CartItemRowProps) {
  const product = getManagedProductById(item.productId)
  if (!product) return null

  const lineTotal = calculateLineTotal(product, item.quantity)

  return (
    <Card className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h3 className="font-heading font-semibold text-ink">{product.name}</h3>
        <p className="text-sm text-muted">{product.brand}</p>
        <p className="mt-1 text-sm text-muted">
          {formatCartItemQuantity(product, item.quantity)}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-heading font-bold text-primary">{formatPrice(lineTotal)}</p>
        <Button variant="ghost" size="sm" className="mt-1" onClick={onRemove}>
          Remover
        </Button>
      </div>
    </Card>
  )
}
