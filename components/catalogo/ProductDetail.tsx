'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import type { Product } from '@/lib/types'
import {
  isUnitProduct,
  isWeightProduct,
} from '@/lib/products/display'
import { calculateLineTotal, getInitialQuantity } from '@/lib/cart/pricing'
import { productCategories } from '@/lib/data/products'
import { matchFoodProductsForPet } from '@/lib/recommendations/foodMatcher'
import { isPetProfileReadyForRecommendations } from '@/lib/recommendations/petProfile'
import { useCart } from '@/lib/hooks/useCart'
import { usePets } from '@/lib/hooks/usePets'
import { useProducts } from '@/lib/hooks/useProducts'
import { formatPrice } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { WeightSelector } from '@/components/catalogo/WeightSelector'
import { ProductPrice } from '@/components/catalogo/ProductPrice'

interface ProductDetailProps {
  product: Product
}

const categoryLabels = Object.fromEntries(
  productCategories.map((c) => [c.value, c.label])
)

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem } = useCart()
  const { activePet } = usePets()
  const { catalogProducts } = useProducts()
  const [quantity, setQuantity] = useState(() => getInitialQuantity(product))
  const [added, setAdded] = useState(false)

  const lineTotal = calculateLineTotal(product, quantity)

  const productMatch = useMemo(() => {
    if (!activePet || !isPetProfileReadyForRecommendations(activePet)) return null
    return matchFoodProductsForPet(activePet, 20, catalogProducts).find(
      (m) => m.product.id === product.id
    )
  }, [activePet, product.id, catalogProducts])

  function handleAddToCart() {
    addItem(product.id, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      <Link
        href="/catalogo"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao catálogo
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card className="aspect-square p-0">
          <div className="flex h-full items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </Card>

        <div className="space-y-5">
          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge variant="outline">{categoryLabels[product.category]}</Badge>
              {isWeightProduct(product) && <Badge variant="secondary">A granel</Badge>}
              {product.promoPercent && product.promoPercent > 0 && (
                <Badge variant="secondary">Promoção</Badge>
              )}
              {productMatch && (
                <Badge variant="primary">{productMatch.score}% compatível</Badge>
              )}
            </div>
            <h1 className="font-heading text-2xl font-bold text-ink md:text-3xl">
              {product.name}
            </h1>
            <p className="mt-1 text-muted">{product.brand}</p>
            <div className="mt-3">
              <ProductPrice product={product} size="lg" />
            </div>
            {product.description && (
              <p className="mt-3 text-sm leading-relaxed text-muted">{product.description}</p>
            )}
          </div>

          {productMatch && activePet && (
            <Card className="bg-secondary/15">
              <p className="font-heading text-sm font-semibold text-ink">
                Compatibilidade com {activePet.name}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted">
                {productMatch.reasons.map((reason) => (
                  <li key={reason}>• {reason}</li>
                ))}
              </ul>
            </Card>
          )}

          {isWeightProduct(product) ? (
            <WeightSelector product={product} grams={quantity} onChange={setQuantity} />
          ) : isUnitProduct(product) ? (
            <Card>
              <p className="mb-3 font-heading text-sm font-semibold text-ink">Quantidade</p>
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
                <span className="min-w-[40px] text-center font-heading text-lg font-bold">
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
              <p className="mt-4 font-heading text-lg font-bold text-primary">
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
