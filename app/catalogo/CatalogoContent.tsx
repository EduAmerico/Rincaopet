'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CatalogFiltersPanel } from '@/components/catalogo/CatalogFilters'
import { ProductGrid } from '@/components/catalogo/ProductGrid'
import { RecommendedForPet } from '@/components/catalogo/RecommendedForPet'
import { PageHeader } from '@/components/layout/PageHeader'
import { useCatalogFilters } from '@/lib/hooks/useCatalogFilters'
import { usePets } from '@/lib/hooks/usePets'

export function CatalogoContent() {
  const searchParams = useSearchParams()
  const petIdParam = searchParams.get('petId')
  const { pets, loaded, setActivePet, activePet } = usePets()
  const {
    filters,
    filteredProducts,
    toggleBrand,
    toggleCategory,
    setSearch,
    setPriceRange,
    resetFilters,
  } = useCatalogFilters()

  useEffect(() => {
    if (petIdParam && loaded) {
      setActivePet(petIdParam)
    }
  }, [petIdParam, loaded, setActivePet])

  const displayPet =
    (petIdParam ? pets.find((p) => p.id === petIdParam) : null) ?? activePet

  return (
    <div>
      <PageHeader
        title="Catálogo"
        description="Explore produtos e filtre por marca, categoria e faixa de preço."
      />

      {loaded && displayPet && <RecommendedForPet pet={displayPet} />}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <CatalogFiltersPanel
          filters={filters}
          resultCount={filteredProducts.length}
          onSearch={setSearch}
          onToggleBrand={toggleBrand}
          onToggleCategory={toggleCategory}
          onPriceRange={setPriceRange}
          onReset={resetFilters}
        />
        <div>
          {displayPet && (
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Catálogo completo</h2>
          )}
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  )
}
