import type { Product, WeightProduct } from '@/lib/types'
import {
  getDefaultWeightGrams,
  getEffectivePricePerKg,
  getEffectiveUnitPrice,
  isUnitProduct,
  isWeightProduct,
} from '@/lib/products/display'

export function calculateWeightPrice(product: WeightProduct, grams: number): number {
  const clamped = Math.max(grams, product.minimumWeightGrams)
  return (clamped / 1000) * getEffectivePricePerKg(product)
}

export function calculateLineTotal(product: Product, quantity: number): number {
  if (isUnitProduct(product)) {
    return getEffectiveUnitPrice(product) * quantity
  }
  if (isWeightProduct(product)) {
    return calculateWeightPrice(product, quantity)
  }
  return 0
}

export function getUnitPriceForQuantity(product: Product, quantity: number): number {
  if (isUnitProduct(product)) return getEffectiveUnitPrice(product)
  if (isWeightProduct(product)) return calculateWeightPrice(product, quantity)
  return 0
}

export function getInitialQuantity(product: Product): number {
  if (isUnitProduct(product)) return 1
  if (isWeightProduct(product)) return getDefaultWeightGrams(product)
  return 1
}

export function clampWeightQuantity(product: WeightProduct, grams: number): number {
  const stepped =
    Math.round(grams / product.weightStepGrams) * product.weightStepGrams
  return Math.max(stepped, product.minimumWeightGrams)
}

export function adjustWeightQuantity(
  product: WeightProduct,
  currentGrams: number,
  direction: 'increment' | 'decrement'
): number {
  const delta = direction === 'increment' ? product.weightStepGrams : -product.weightStepGrams
  return clampWeightQuantity(product, currentGrams + delta)
}
