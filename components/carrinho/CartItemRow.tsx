'use client'

import { getProductById } from '@/lib/data/products'
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
  const product = getProductById(item.productId)
  if (!product) return null

  const lineTotal = calculateLineTotal(product, item.quantity)

  return (
    <Card className="flex items-start justify-between gap-4">
      <div>
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p className="mt-1 text-sm text-gray-600">
          {formatCartItemQuantity(product, item.quantity)}
        </p>
      </div>
      <div className="text-right">
        <p className="font-bold text-pet-orange">{formatPrice(lineTotal)}</p>
        <Button variant="ghost" className="mt-2 px-2 py-1 text-xs" onClick={onRemove}>
          Remover
        </Button>
      </div>
    </Card>
  )
}
