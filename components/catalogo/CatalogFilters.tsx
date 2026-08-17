'use client'

import { productBrands, productCategories, maxProductPrice } from '@/lib/data/products'
import type { CatalogFilters, ProductCategory } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'

interface CatalogFiltersProps {
  filters: CatalogFilters
  resultCount: number
  onSearch: (value: string) => void
  onToggleBrand: (brand: string) => void
  onToggleCategory: (category: ProductCategory) => void
  onPriceRange: (min: number, max: number) => void
  onReset: () => void
}

export function CatalogFiltersPanel({
  filters,
  resultCount,
  onSearch,
  onToggleBrand,
  onToggleCategory,
  onPriceRange,
  onReset,
}: CatalogFiltersProps) {
  return (
    <Card className="h-fit space-y-6">
      <div>
        <h2 className="font-bold text-gray-900">Filtros</h2>
        <p className="text-sm text-gray-500">{resultCount} produto(s) encontrado(s)</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Buscar</label>
        <Input
          placeholder="Nome do produto..."
          value={filters.search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Marca</p>
        <div className="space-y-2">
          {productBrands.map((brand) => (
            <label key={brand} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => onToggleBrand(brand)}
                className="rounded border-gray-300 text-pet-green focus:ring-pet-green"
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">Categoria</p>
        <div className="space-y-2">
          {productCategories.map((category) => (
            <label key={category.value} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.categories.includes(category.value)}
                onChange={() => onToggleCategory(category.value)}
                className="rounded border-gray-300 text-pet-green focus:ring-pet-green"
              />
              {category.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-gray-700">
          Preço: R$ {filters.minPrice.toFixed(0)} — R$ {filters.maxPrice.toFixed(0)}
        </p>
        <input
          type="range"
          min={0}
          max={maxProductPrice}
          step={10}
          value={filters.maxPrice}
          onChange={(e) => onPriceRange(filters.minPrice, Number(e.target.value))}
          className="w-full accent-pet-green"
        />
      </div>

      <Button variant="outline" className="w-full" onClick={onReset}>
        Limpar filtros
      </Button>
    </Card>
  )
}
