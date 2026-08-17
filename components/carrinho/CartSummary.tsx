'use client'



import { useState } from 'react'

import Link from 'next/link'

import { MessageCircle } from 'lucide-react'

import { buildWhatsAppCheckoutUrl } from '@/lib/cart/whatsappCheckout'

import { getAchievementById } from '@/lib/gamification/achievements'

import { XP_PURCHASE } from '@/lib/gamification/xpCalculator'

import { useCart } from '@/lib/hooks/useCart'

import { usePets } from '@/lib/hooks/usePets'

import { formatPrice } from '@/lib/utils'

import { Button } from '@/components/ui/Button'

import { Card } from '@/components/ui/Card'

import { AchievementToast } from '@/components/banho-tosa/gamification/AchievementToast'

import type { Achievement } from '@/lib/types'



export function CartSummary() {

  const { cart, total, clearCart, markWhatsAppOrderSent } = useCart()

  const { activePet, awardPurchaseXp } = usePets()

  const [toastAchievements, setToastAchievements] = useState<Achievement[]>([])

  const [lastXpEarned, setLastXpEarned] = useState<number | null>(null)



  function handleWhatsAppCheckout() {

    if (cart.items.length === 0) return



    const isFirstOrder = markWhatsAppOrderSent()

    const url = buildWhatsAppCheckoutUrl(cart.items)

    window.open(url, '_blank', 'noopener,noreferrer')



    const xpEarned = awardPurchaseXp(activePet?.id)

    if (xpEarned > 0) setLastXpEarned(xpEarned)



    if (isFirstOrder) {

      const achievement = getAchievementById('primeiro_pedido_whatsapp')

      if (achievement) setToastAchievements([achievement])

    }

  }



  return (

    <>

      <Card className="sticky top-24 space-y-4">

        <h2 className="text-lg font-bold text-gray-900">Resumo</h2>

        <div className="flex justify-between text-sm">

          <span className="text-gray-600">Itens</span>

          <span className="font-medium">{cart.items.length}</span>

        </div>

        <div className="flex justify-between border-t border-gray-100 pt-3">

          <span className="font-semibold text-gray-900">Total</span>

          <span className="text-2xl font-bold text-pet-orange">{formatPrice(total)}</span>

        </div>

        {activePet && (

          <p className="text-xs text-gray-500">

            +{XP_PURCHASE} XP para {activePet.name} ao enviar o pedido

          </p>

        )}

        {lastXpEarned !== null && (

          <p className="text-sm font-medium text-pet-green">+{lastXpEarned} XP ganhos!</p>

        )}

        <Button

          className="w-full"

          disabled={cart.items.length === 0}

          onClick={handleWhatsAppCheckout}

        >

          <MessageCircle className="h-4 w-4" />

          Finalizar pelo WhatsApp

        </Button>

        {cart.items.length > 0 && (

          <Button variant="ghost" className="w-full" onClick={clearCart}>

            Limpar carrinho

          </Button>

        )}

        <p className="text-xs text-gray-500">

          O pedido será enviado como mensagem no WhatsApp. A loja confirmará a compra

          manualmente.

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


