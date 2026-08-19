import type { Product, UnitProduct, WeightProduct } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

export function isUnitProduct(product: Product): product is UnitProduct {
  return product.saleType === 'unit'
}

export function isWeightProduct(product: Product): product is WeightProduct {
  return product.saleType === 'weight'
}

export function getPromoPercent(product: Product): number {
  const percent = product.promoPercent ?? 0
  if (percent <= 0) return 0
  return Math.min(90, Math.round(percent))
}

export function hasPromo(product: Product): boolean {
  return getPromoPercent(product) > 0
}

export function applyPromo(price: number, percent: number): number {
  if (percent <= 0) return price
  return Math.round(price * (1 - percent / 100) * 100) / 100
}

export function getEffectiveUnitPrice(product: UnitProduct): number {
  return applyPromo(product.price, getPromoPercent(product))
}

export function getEffectivePricePerKg(product: WeightProduct): number {
  return applyPromo(product.pricePerKg, getPromoPercent(product))
}

export function getListPrice(product: Product): number {
  if (isUnitProduct(product)) return product.price
  return product.pricePerKg
}

export function getProductFilterPrice(product: Product): number {
  if (isUnitProduct(product)) return getEffectiveUnitPrice(product)
  return getEffectivePricePerKg(product)
}

export function getDefaultWeightGrams(product: WeightProduct): number {
  return Math.max(product.minimumWeightGrams, product.weightStepGrams)
}

export function formatWeightGrams(grams: number): string {
  if (grams >= 1000) {
    const kg = grams / 1000
    return `${kg.toLocaleString('pt-BR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} kg`
  }
  return `${grams} g`
}

export function formatProductPriceLabel(product: Product): string {
  if (isUnitProduct(product)) return formatPrice(getEffectiveUnitPrice(product))
  return `${formatPrice(getEffectivePricePerKg(product))}/kg`
}

export function formatOriginalPriceLabel(product: Product): string | null {
  if (!hasPromo(product)) return null
  if (isUnitProduct(product)) return formatPrice(product.price)
  return `${formatPrice(product.pricePerKg)}/kg`
}

export function formatCartItemQuantity(product: Product, quantity: number): string {
  if (isUnitProduct(product)) {
    return quantity === 1 ? '1 un' : `${quantity} un`
  }
  return formatWeightGrams(quantity)
}
