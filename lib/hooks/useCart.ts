'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { getManagedProductById, ensureProductCatalogLoaded } from '@/lib/catalog/productRepository'
import { calculateLineTotal, getUnitPriceForQuantity } from '@/lib/cart/pricing'
import type { Cart, CartItem } from '@/lib/types'

const CART_KEY = 'petshop_cart'
const WHATSAPP_ORDERS_KEY = 'petshop_whatsapp_orders'

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

const emptyCart: Cart = { items: [], updatedAt: new Date(0).toISOString() }

export function useCart() {
  const [cart, setCart] = useState<Cart>(emptyCart)
  const [loaded, setLoaded] = useState(false)
  const [hasWhatsAppOrder, setHasWhatsAppOrder] = useState(false)

  useEffect(() => {
    ensureProductCatalogLoaded()
    setCart(readStorage(CART_KEY, emptyCart))
    setHasWhatsAppOrder(readStorage<boolean>(WHATSAPP_ORDERS_KEY, false))
    setLoaded(true)
  }, [])

  const persistCart = useCallback((next: Cart) => {
    setCart(next)
    writeStorage(CART_KEY, next)
  }, [])

  const addItem = useCallback(
    (productId: string, quantity: number) => {
      const product = getManagedProductById(productId)
      if (!product) return

      const unitPrice = getUnitPriceForQuantity(product, quantity)
      const existingIndex = cart.items.findIndex(
        (item) => item.productId === productId && item.quantity === quantity
      )

      let nextItems: CartItem[]
      if (existingIndex >= 0) {
        nextItems = cart.items.map((item, index) =>
          index === existingIndex
            ? { ...item, unitPrice }
            : item
        )
      } else {
        nextItems = [...cart.items, { productId, quantity, unitPrice }]
      }

      persistCart({
        items: nextItems,
        updatedAt: new Date().toISOString(),
      })
    },
    [cart.items, persistCart]
  )

  const removeItem = useCallback(
    (productId: string, quantity: number) => {
      persistCart({
        items: cart.items.filter(
          (item) => !(item.productId === productId && item.quantity === quantity)
        ),
        updatedAt: new Date().toISOString(),
      })
    },
    [cart.items, persistCart]
  )

  const clearCart = useCallback(() => {
    persistCart({ items: [], updatedAt: new Date().toISOString() })
  }, [persistCart])

  const markWhatsAppOrderSent = useCallback(() => {
    const isFirstOrder = !hasWhatsAppOrder
    setHasWhatsAppOrder(true)
    writeStorage(WHATSAPP_ORDERS_KEY, true)
    return isFirstOrder
  }, [hasWhatsAppOrder])

  const itemCount = cart.items.length

  const total = useMemo(() => {
    return cart.items.reduce((sum, item) => {
      const product = getManagedProductById(item.productId)
      if (!product) return sum
      return sum + calculateLineTotal(product, item.quantity)
    }, 0)
  }, [cart.items])

  return {
    cart,
    loaded,
    itemCount,
    total,
    hasWhatsAppOrder,
    addItem,
    removeItem,
    clearCart,
    markWhatsAppOrderSent,
  }
}
