'use client'

import { useMemo, useState } from 'react'
import { maxProductPrice, products } from '@/lib/data/products'
import { getProductFilterPrice } from '@/lib/products/display'
import type { CatalogFilters, ProductCategory } from '@/lib/types'

const defaultFilters: CatalogFilters = {
  search: '',
  brands: [],
  categories: [],
  minPrice: 0,
  maxPrice: maxProductPrice,
}

export function useCatalogFilters() {
  const [filters, setFilters] = useState<CatalogFilters>(defaultFilters)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(filters.search.toLowerCase().trim())

      const matchesBrand =
        filters.brands.length === 0 || filters.brands.includes(product.brand)

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(product.category)

      const filterPrice = getProductFilterPrice(product)
      const matchesPrice =
        filterPrice >= filters.minPrice && filterPrice <= filters.maxPrice

      return matchesSearch && matchesBrand && matchesCategory && matchesPrice
    })
  }, [filters])

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

  function setPriceRange(minPrice: number, maxPrice: number) {
    setFilters((prev) => ({ ...prev, minPrice, maxPrice }))
  }

  function resetFilters() {
    setFilters(defaultFilters)
  }

  return {
    filters,
    filteredProducts,
    toggleBrand,
    toggleCategory,
    setSearch,
    setPriceRange,
    resetFilters,
  }
}
