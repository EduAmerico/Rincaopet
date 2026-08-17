'use client'

import { Minus, Plus } from 'lucide-react'
import type { WeightProduct } from '@/lib/types'
import {
  adjustWeightQuantity,
  calculateWeightPrice,
} from '@/lib/cart/pricing'
import { formatWeightGrams } from '@/lib/products/display'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface WeightSelectorProps {
  product: WeightProduct
  grams: number
  onChange: (grams: number) => void
}

export function WeightSelector({ product, grams, onChange }: WeightSelectorProps) {
  const total = calculateWeightPrice(product, grams)
  const atMinimum = grams <= product.minimumWeightGrams

  return (
    <Card className="space-y-4">
      <div>
        <p className="text-sm font-medium text-gray-600">Venda a granel</p>
        <p className="text-2xl font-bold text-pet-orange">
          {formatPrice(product.pricePerKg)}/kg
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Quanto você quer?</p>
        <div className="flex items-center justify-center gap-4">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-11 px-0"
            disabled={atMinimum}
            onClick={() =>
              onChange(adjustWeightQuantity(product, grams, 'decrement'))
            }
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="min-w-[120px] text-center">
            <p className="text-xl font-bold text-gray-900">{formatWeightGrams(grams)}</p>
            <p className="text-xs text-gray-500">
              mín. {formatWeightGrams(product.minimumWeightGrams)}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="h-11 w-11 px-0"
            onClick={() =>
              onChange(adjustWeightQuantity(product, grams, 'increment'))
            }
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-xl bg-green-50 p-4 text-center">
        <p className="text-sm text-gray-600">Total</p>
        <p className="text-2xl font-bold text-pet-green">{formatPrice(total)}</p>
      </div>
    </Card>
  )
}
