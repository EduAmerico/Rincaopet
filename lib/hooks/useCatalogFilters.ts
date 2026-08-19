'use client'

import { useMemo, useState } from 'react'
import { matchesCatalogNavCategory, type CatalogNavCategory } from '@/lib/catalog/categories'
import { getProductFilterPrice } from '@/lib/products/display'
import { useProducts } from '@/lib/hooks/useProducts'
import type { CatalogFilters, ProductCategory } from '@/lib/types'

export function useCatalogFilters() {
  const { catalogProducts, brands, maxPrice, loaded } = useProducts()
  const [filters, setFilters] = useState<CatalogFilters>({
    search: '',
    brands: [],
    categories: [],
    minPrice: 0,
    maxPrice: 9999,
  })
  const [navCategory, setNavCategory] = useState<CatalogNavCategory>('all')

  const effectiveMax = loaded ? maxPrice : filters.maxPrice

  const filteredProducts = useMemo(() => {
    const max = filters.maxPrice >= 9999 ? effectiveMax : filters.maxPrice
    return catalogProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(filters.search.toLowerCase().trim())

      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand)

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category)

      const filterPrice = getProductFilterPrice(product)
      const matchesPrice = filterPrice >= filters.minPrice && filterPrice <= max

      const matchesNav = matchesCatalogNavCategory(product, navCategory)

      return (
        matchesSearch &&
        matchesBrand &&
        matchesCategory &&
        matchesPrice &&
        matchesNav
      )
    })
  }, [catalogProducts, filters, navCategory, effectiveMax])

  function toggleBrand(brand: string) {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }))
  }

  function toggleCategory(category: ProductCategory) {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  function setSearch(search: string) {
    setFilters((prev) => ({ ...prev, search }))
  }

  function setPriceRange(min: number, max: number) {
    setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }))
  }

  function resetFilters() {
    setFilters({
      search: '',
      brands: [],
      categories: [],
      minPrice: 0,
      maxPrice: effectiveMax,
    })
    setNavCategory('all')
  }

  return {
    filters,
    navCategory,
    filteredProducts,
    brands,
    maxPrice: effectiveMax,
    toggleBrand,
    toggleCategory,
    setSearch,
    setPriceRange,
    setNavCategory,
    resetFilters,
  }
}
