'use client'

import { productCategories } from '@/lib/data/products'
import type { CatalogFilters, ProductCategory } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { Drawer } from '@/components/ui/Drawer'

interface FiltersDrawerProps {
  open: boolean
  onClose: () => void
  filters: CatalogFilters
  resultCount: number
  brands: string[]
  maxPrice: number
  onToggleBrand: (brand: string) => void
  onToggleCategory: (category: ProductCategory) => void
  onPriceRange: (min: number, max: number) => void
  onReset: () => void
}

export function FiltersDrawer({
  open,
  onClose,
  filters,
  resultCount,
  brands,
  maxPrice,
  onToggleBrand,
  onToggleCategory,
  onPriceRange,
  onReset,
}: FiltersDrawerProps) {
  return (
    <Drawer open={open} onClose={onClose} title="Filtros">
      <p className="mb-4 text-sm text-muted">{resultCount} produto(s) encontrado(s)</p>

      <div className="space-y-5">
        <div>
          <p className="mb-2 font-heading text-sm font-semibold text-ink">Marca</p>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <Chip
                key={brand}
                selected={filters.brands.includes(brand)}
                onClick={() => onToggleBrand(brand)}
              >
                {brand}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 font-heading text-sm font-semibold text-ink">Categoria</p>
          <div className="flex flex-wrap gap-2">
            {productCategories.map((cat) => (
              <Chip
                key={cat.value}
                selected={filters.categories.includes(cat.value)}
                onClick={() => onToggleCategory(cat.value)}
              >
                {cat.label}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 font-heading text-sm font-semibold text-ink">Faixa de preço</p>
          <div className="flex items-center gap-2 text-sm font-medium text-secondary">
            <span>R$ {filters.minPrice}</span>
            <input
              type="range"
              min={0}
              max={maxPrice}
              value={filters.maxPrice}
              onChange={(e) => onPriceRange(filters.minPrice, Number(e.target.value))}
              className="flex-1 accent-secondary"
            />
            <span>R$ {Math.round(filters.maxPrice)}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1" onClick={onReset}>
            Limpar
          </Button>
          <Button className="flex-1" onClick={onClose}>
            Aplicar
          </Button>
        </div>
      </div>
    </Drawer>
  )
}
