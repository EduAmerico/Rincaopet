import { getManagedProductById } from '@/lib/catalog/productRepository'
import { shopConfig } from '@/lib/config'
import type { CartItem } from '@/lib/types'
import { formatCartItemQuantity } from '@/lib/products/display'
import { formatPrice } from '@/lib/utils'
import { calculateLineTotal } from '@/lib/cart/pricing'

export function buildWhatsAppOrderMessage(items: CartItem[]): string {
  const lines = items.map((item) => {
    const product = getManagedProductById(item.productId)
    if (!product) return null
    const lineTotal = calculateLineTotal(product, item.quantity)
    const qtyLabel = formatCartItemQuantity(product, item.quantity)
    return `• ${product.name} — ${qtyLabel} — ${formatPrice(lineTotal)}`
  }).filter(Boolean)

  const total = items.reduce((sum, item) => {
    const product = getManagedProductById(item.productId)
    if (!product) return sum
    return sum + calculateLineTotal(product, item.quantity)
  }, 0)

  return [
    shopConfig.whatsappDefaultMessage,
    '',
    ...lines,
    '',
    `Total: ${formatPrice(total)}`,
  ].join('\n')
}

export function buildWhatsAppCheckoutUrl(items: CartItem[]): string {
  const message = buildWhatsAppOrderMessage(items)
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${shopConfig.whatsappNumber}?text=${encoded}`
}
