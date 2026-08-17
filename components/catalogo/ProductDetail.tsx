'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import type { Product } from '@/lib/types'
import {
  formatProductPriceLabel,
  isUnitProduct,
  isWeightProduct,
} from '@/lib/products/display'
import {
  calculateLineTotal,
  getInitialQuantity,
} from '@/lib/cart/pricing'
import { productCategories } from '@/lib/data/products'
import { useCart } from '@/lib/hooks/useCart'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { WeightSelector } from '@/components/catalogo/WeightSelector'

interface ProductDetailProps {
  product: Product
}

const categoryLabels = Object.fromEntries(
  productCategories.map((c) => [c.value, c.label])
)

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(() => getInitialQuantity(product))
  const [added, setAdded] = useState(false)

  const lineTotal = calculateLineTotal(product, quantity)

  function handleAddToCart() {
    addItem(product.id, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      <Link
        href="/catalogo"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-pet-green"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao catálogo
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="flex items-center justify-center p-8">
          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-48 object-contain"
          />
        </Card>

        <div className="space-y-6">
          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-pet-green">
                {categoryLabels[product.category]}
              </span>
              {isWeightProduct(product) && (
                <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-pet-orange">
                  A granel
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-1 text-gray-500">{product.brand}</p>
            <p className="mt-3 text-2xl font-bold text-pet-orange">
              {formatProductPriceLabel(product)}
            </p>
          </div>

          {isWeightProduct(product) ? (
            <WeightSelector
              product={product}
              grams={quantity}
              onChange={setQuantity}
            />
          ) : isUnitProduct(product) ? (
            <Card>
              <p className="mb-3 text-sm font-medium text-gray-700">Quantidade</p>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-10 px-0"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  −
                </Button>
                <span className="min-w-[40px] text-center text-lg font-bold">
                  {quantity}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-10 px-0"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </Button>
              </div>
              <p className="mt-4 text-lg font-bold text-pet-green">
                Total: {formatPrice(lineTotal)}
              </p>
            </Card>
          ) : null}

          <Button className="w-full" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
            {added ? 'Adicionado!' : 'Adicionar ao carrinho'}
          </Button>
        </div>
      </div>
    </div>
  )
}
