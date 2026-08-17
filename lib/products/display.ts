import type { Product, UnitProduct, WeightProduct } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

export function isUnitProduct(product: Product): product is UnitProduct {
  return product.saleType === 'unit'
}

export function isWeightProduct(product: Product): product is WeightProduct {
  return product.saleType === 'weight'
}

export function getProductFilterPrice(product: Product): number {
  if (isUnitProduct(product)) return product.price
  return product.pricePerKg
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
  if (isUnitProduct(product)) return formatPrice(product.price)
  return `${formatPrice(product.pricePerKg)}/kg`
}

export function formatCartItemQuantity(product: Product, quantity: number): string {
  if (isUnitProduct(product)) {
    return quantity === 1 ? '1 un' : `${quantity} un`
  }
  return formatWeightGrams(quantity)
}
