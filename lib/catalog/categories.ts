import type { Product } from '@/lib/types'
import { isWeightProduct } from '@/lib/products/display'

export type CatalogNavCategory =
  | 'all'
  | 'racao-granel'
  | 'racao'
  | 'petiscos'
  | 'brinquedos'
  | 'agropecuaria'
  | 'outros'

export const catalogNavCategories: { id: CatalogNavCategory; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'racao-granel', label: 'Rações a granel' },
  { id: 'racao', label: 'Rações' },
  { id: 'petiscos', label: 'Petiscos' },
  { id: 'brinquedos', label: 'Brinquedos' },
  { id: 'agropecuaria', label: 'Agropecuária' },
  { id: 'outros', label: 'Outros' },
]

export function matchesCatalogNavCategory(
  product: Product,
  navCategory: CatalogNavCategory
): boolean {
  if (navCategory === 'all') return true

  if (navCategory === 'racao-granel') {
    return product.category === 'racao' && isWeightProduct(product)
  }

  if (navCategory === 'racao') {
    return product.category === 'racao' && !isWeightProduct(product)
  }

  if (navCategory === 'petiscos') {
    return (
      product.category === 'racao' &&
      isWeightProduct(product) &&
      product.name.toLowerCase().includes('petisco')
    )
  }

  if (navCategory === 'brinquedos') {
    return product.category === 'brinquedo'
  }

  if (navCategory === 'agropecuaria') {
    return product.category === 'higiene'
  }

  if (navCategory === 'outros') {
    return product.category === 'acessorio'
  }

  return true
}
