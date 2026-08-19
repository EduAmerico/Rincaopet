import { seedProducts } from '@/lib/data/products'
import { getProductFilterPrice } from '@/lib/products/display'
import type { Product } from '@/lib/types'

const STORAGE_KEY = 'rincaopet_catalog_products'

let cache: Product[] | null = null
const listeners = new Set<() => void>()

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    description: product.description ?? '',
    promoPercent: product.promoPercent ?? 0,
    active: product.active !== false,
  }
}

function seedCatalog(): Product[] {
  return seedProducts.map(normalizeProduct)
}

function readStored(): Product[] | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Product[]
    if (!Array.isArray(parsed)) return null
    return parsed.map(normalizeProduct)
  } catch {
    return null
  }
}

function persist(next: Product[]) {
  cache = next
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }
  listeners.forEach((listener) => listener())
}

export function isProductActive(product: Product): boolean {
  return product.active !== false
}

export function ensureProductCatalogLoaded(): Product[] {
  if (cache) return cache
  const stored = readStored()
  cache = stored ?? seedCatalog()
  if (!stored && typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache))
  }
  return cache
}

export function getManagedProducts(): Product[] {
  return ensureProductCatalogLoaded()
}

export function getCatalogProducts(): Product[] {
  return getManagedProducts().filter(isProductActive)
}

export function getManagedProductById(id: string): Product | undefined {
  return getManagedProducts().find((product) => product.id === id)
}

export function getCatalogProductById(id: string): Product | undefined {
  const product = getManagedProductById(id)
  if (!product || !isProductActive(product)) return undefined
  return product
}

export function subscribeProductCatalog(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function createManagedProduct(product: Product) {
  const nextProduct = normalizeProduct(product)
  persist([nextProduct, ...getManagedProducts()])
  return nextProduct
}

export function updateManagedProduct(id: string, product: Product) {
  persist(
    getManagedProducts().map((item) =>
      item.id === id ? normalizeProduct({ ...product, id }) : item
    )
  )
}

export function deleteManagedProduct(id: string) {
  persist(getManagedProducts().filter((product) => product.id !== id))
}

export function restoreSeedCatalog() {
  persist(seedCatalog())
}

export function getCatalogBrands(list: Product[] = getCatalogProducts()) {
  return Array.from(new Set(list.map((product) => product.brand).filter(Boolean))).sort()
}

export function getCatalogMaxPrice(list: Product[] = getCatalogProducts()) {
  if (list.length === 0) return 100
  return Math.max(...list.map(getProductFilterPrice), 1)
}
