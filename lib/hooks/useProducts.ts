'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { seedProducts } from '@/lib/data/products'
import {
  createManagedProduct,
  deleteManagedProduct,
  getCatalogBrands,
  getCatalogMaxPrice,
  getManagedProductById,
  getManagedProducts,
  isProductActive,
  restoreSeedCatalog,
  subscribeProductCatalog,
  updateManagedProduct,
} from '@/lib/catalog/productRepository'
import type { Product } from '@/lib/types'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(seedProducts)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const sync = () => setProducts(getManagedProducts())
    sync()
    setLoaded(true)
    return subscribeProductCatalog(sync)
  }, [])

  const catalogProducts = useMemo(
    () => products.filter(isProductActive),
    [products]
  )
  const brands = useMemo(() => getCatalogBrands(catalogProducts), [catalogProducts])
  const maxPrice = useMemo(() => getCatalogMaxPrice(catalogProducts), [catalogProducts])

  const getById = useCallback(
    (id: string) => products.find((product) => product.id === id) ?? getManagedProductById(id),
    [products]
  )

  const createProduct = useCallback((product: Product) => {
    return createManagedProduct(product)
  }, [])

  const updateProduct = useCallback((id: string, product: Product) => {
    updateManagedProduct(id, product)
  }, [])

  const deleteProduct = useCallback((id: string) => {
    deleteManagedProduct(id)
  }, [])

  const restoreCatalog = useCallback(() => {
    restoreSeedCatalog()
  }, [])

  return {
    loaded,
    products,
    catalogProducts,
    brands,
    maxPrice,
    getById,
    createProduct,
    updateProduct,
    deleteProduct,
    restoreCatalog,
  }
}
