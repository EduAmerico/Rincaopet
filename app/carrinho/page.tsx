'use client'

import Link from 'next/link'
import { useCart } from '@/lib/hooks/useCart'
import { PageHeader } from '@/components/layout/PageHeader'
import { CartItemRow } from '@/components/carrinho/CartItemRow'
import { CartSummary } from '@/components/carrinho/CartSummary'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function CarrinhoPage() {
  const { cart, loaded, removeItem } = useCart()

  if (!loaded) {
    return <p className="text-muted">Carregando carrinho...</p>
  }

  return (
    <div>
      <PageHeader
        title="Carrinho"
        description="Revise seus itens e finalize pelo WhatsApp."
      />

      {cart.items.length === 0 ? (
        <Card className="text-center">
          <p className="font-heading text-lg font-semibold text-ink">Seu carrinho está vazio</p>
          <p className="mt-2 text-sm text-muted">
            Explore o catálogo e adicione produtos unitários ou a granel.
          </p>
          <Link href="/catalogo" className="mt-6 inline-block">
            <Button>Ir ao catálogo</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <div className="space-y-3">
            {cart.items.map((item) => (
              <CartItemRow
                key={`${item.productId}-${item.quantity}`}
                item={item}
                onRemove={() => removeItem(item.productId, item.quantity)}
              />
            ))}
          </div>
          <CartSummary />
        </div>
      )}
    </div>
  )
}
