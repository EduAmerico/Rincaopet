'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { buildWhatsAppCheckoutUrl } from '@/lib/cart/whatsappCheckout'
import { getAchievementById } from '@/lib/gamification/achievements'
import { COINS_PURCHASE } from '@/lib/gamification/coins'
import { useCart } from '@/lib/hooks/useCart'
import { usePets } from '@/lib/hooks/usePets'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { AchievementToast } from '@/components/banho-tosa/gamification/AchievementToast'
import { CoinAmount } from '@/components/banho-tosa/gamification/CoinsDisplay'
import type { Achievement } from '@/lib/types'

export function CartSummary() {
  const { cart, total, clearCart, markWhatsAppOrderSent } = useCart()
  const { activePet, awardPurchaseCoins } = usePets()
  const [toastAchievements, setToastAchievements] = useState<Achievement[]>([])
  const [lastCoinsEarned, setLastCoinsEarned] = useState<number | null>(null)

  function handleWhatsAppCheckout() {
    if (cart.items.length === 0) return

    const isFirstOrder = markWhatsAppOrderSent()
    const url = buildWhatsAppCheckoutUrl(cart.items)
    window.open(url, '_blank', 'noopener,noreferrer')

    const coinsEarned = awardPurchaseCoins(activePet?.id)
    if (coinsEarned > 0) setLastCoinsEarned(coinsEarned)

    if (isFirstOrder) {
      const achievement = getAchievementById('primeiro_pedido_whatsapp')
      if (achievement) setToastAchievements([achievement])
    }
  }

  return (
    <>
      <Card className="sticky top-24 space-y-4">
        <h2 className="font-heading text-lg font-bold text-ink">Resumo</h2>
        <div className="flex justify-between text-sm">
          <span className="text-muted">Itens</span>
          <span className="font-medium text-ink">{cart.items.length}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-3">
          <span className="font-heading font-semibold text-ink">Total</span>
          <span className="font-heading text-2xl font-bold text-primary">{formatPrice(total)}</span>
        </div>
        {activePet && (
          <p className="text-xs text-muted">
            +<CoinAmount amount={COINS_PURCHASE} /> para {activePet.name} ao enviar
          </p>
        )}
        {lastCoinsEarned !== null && (
          <p className="text-sm font-medium text-secondary">
            +<CoinAmount amount={lastCoinsEarned} />
          </p>
        )}
        <Button className="w-full" disabled={cart.items.length === 0} onClick={handleWhatsAppCheckout}>
          <MessageCircle className="h-4 w-4" />
          Finalizar pelo WhatsApp
        </Button>
        {cart.items.length > 0 && (
          <Button variant="ghost" className="w-full" onClick={clearCart}>
            Limpar carrinho
          </Button>
        )}
        <p className="text-xs text-muted">
          O pedido será enviado no WhatsApp. A loja confirmará manualmente.
        </p>
        <Link href="/catalogo">
          <Button variant="outline" className="w-full">
            Continuar comprando
          </Button>
        </Link>
      </Card>

      <AchievementToast
        achievements={toastAchievements}
        onClose={() => setToastAchievements([])}
      />
    </>
  )
}
