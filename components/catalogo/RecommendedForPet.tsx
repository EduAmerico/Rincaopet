'use client'

import type { Pet } from '@/lib/types'
import { matchFoodProductsForPet, FOOD_DISCLAIMER } from '@/lib/recommendations/foodMatcher'
import { getProfileSummaryTags, isPetProfileReadyForRecommendations } from '@/lib/recommendations/petProfile'
import { ProductMatchCard } from '@/components/catalogo/ProductMatchCard'
import { Card } from '@/components/ui/Card'

interface RecommendedForPetProps {
  pet: Pet
}

export function RecommendedForPet({ pet }: RecommendedForPetProps) {
  if (!isPetProfileReadyForRecommendations(pet)) {
    return (
      <Card className="mb-8 border-dashed">
        <p className="font-semibold text-gray-700">Complete o perfil de {pet.name}</p>
        <p className="mt-1 text-sm text-gray-500">
          Preencha peso, castração e condição corporal para ver recomendações personalizadas.
        </p>
      </Card>
    )
  }

  const matches = matchFoodProductsForPet(pet, 5)
  const tags = getProfileSummaryTags(pet)

  if (matches.length === 0) {
    return null
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-gray-900">Recomendados para {pet.name}</h2>
      {tags.length > 0 && (
        <p className="mt-1 text-sm text-gray-500">{tags.join(' • ')}</p>
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <ProductMatchCard key={match.product.id} match={match} petName={pet.name} />
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-500">{FOOD_DISCLAIMER}</p>
    </section>
  )
}
