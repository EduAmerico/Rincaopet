'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal } from 'lucide-react'
import { CategoryChips } from '@/components/catalogo/CategoryChips'
import { CatalogSearchBar } from '@/components/catalogo/CatalogSearchBar'
import { FiltersDrawer } from '@/components/catalogo/FiltersDrawer'
import { ProductGrid } from '@/components/catalogo/ProductGrid'
import { PageHeader } from '@/components/layout/PageHeader'
import { Button } from '@/components/ui/Button'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useCatalogFilters } from '@/lib/hooks/useCatalogFilters'
import { usePets } from '@/lib/hooks/usePets'

export function CatalogoContent() {
  const searchParams = useSearchParams()
  const petIdParam = searchParams.get('petId')
  const { loaded, setActivePet } = usePets()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const {
    filters,
    navCategory,
    filteredProducts,
    brands,
    maxPrice,
    toggleBrand,
    toggleCategory,
    setSearch,
    setPriceRange,
    setNavCategory,
    resetFilters,
  } = useCatalogFilters()

  useEffect(() => {
    if (petIdParam && loaded) {
      setActivePet(petIdParam)
    }
  }, [petIdParam, loaded, setActivePet])

  return (
    <div>
      <PageHeader
        title="Catálogo"
        description="Encontre rações, petiscos, brinquedos e muito mais."
      />

      <div className="mb-4 space-y-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <CatalogSearchBar value={filters.search} onChange={setSearch} />
          </div>
          <Button
            variant="outline"
            className="shrink-0 px-3"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="hidden sm:inline">Filtros</span>
          </Button>
        </div>
        <CategoryChips selected={navCategory} onSelect={setNavCategory} />
      </div>

      <SectionHeader
        title="Catálogo completo"
        description={`${filteredProducts.length} produto(s)`}
      />
      <ProductGrid products={filteredProducts} />

      <FiltersDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        resultCount={filteredProducts.length}
        brands={brands}
        maxPrice={maxPrice}
        onToggleBrand={toggleBrand}
        onToggleCategory={toggleCategory}
        onPriceRange={setPriceRange}
        onReset={resetFilters}
      />
    </div>
  )
}
