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
    return <p className="text-gray-600">Carregando carrinho...</p>
  }

  return (
    <div>
      <PageHeader
        title="Carrinho"
        description="Revise seus itens e finalize o pedido pelo WhatsApp."
      />

      {cart.items.length === 0 ? (
        <Card className="text-center">
          <p className="text-lg font-semibold text-gray-700">Seu carrinho está vazio</p>
          <p className="mt-2 text-sm text-gray-500">
            Explore o catálogo e adicione produtos unitários ou a granel.
          </p>
          <Link href="/catalogo" className="mt-6 inline-block">
            <Button>Ir ao catálogo</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
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
