'use client'

import type { Pet } from '@/lib/types'
import { matchFoodProductsForPet, FOOD_DISCLAIMER } from '@/lib/recommendations/foodMatcher'
import { getProfileSummaryTags, isPetProfileReadyForRecommendations } from '@/lib/recommendations/petProfile'
import { ProductMatchCard } from '@/components/catalogo/ProductMatchCard'
import { RecommendationsCarousel } from '@/components/catalogo/RecommendationsCarousel'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Card } from '@/components/ui/Card'
import Link from 'next/link'
import { useProducts } from '@/lib/hooks/useProducts'
import { Button } from '@/components/ui/Button'

interface RecommendedForPetProps {
  pet: Pet
  compact?: boolean
}

export function RecommendedForPet({ pet, compact = false }: RecommendedForPetProps) {
  const { catalogProducts } = useProducts()

  if (!isPetProfileReadyForRecommendations(pet)) {
    return (
      <Card className="mb-6 border-dashed bg-background">
        <p className="font-heading font-semibold text-ink">Complete o perfil de {pet.name}</p>
        <p className="mt-1 text-sm text-muted">
          Preencha peso e castração para ver recomendações.
        </p>
        <Link href={`/banho-tosa/editar/${pet.id}`} className="mt-3 inline-block">
          <Button size="sm" variant="outline">
            Completar perfil
          </Button>
        </Link>
      </Card>
    )
  }

  const matches = matchFoodProductsForPet(pet, 5, catalogProducts)
  const tags = getProfileSummaryTags(pet)

  if (matches.length === 0) return null

  return (
    <section className={compact ? 'mb-6' : 'mb-8'}>
      <SectionHeader
        title={`Recomendados para ${pet.name}`}
        description={tags.length > 0 ? tags.join(' · ') : undefined}
      />
      <RecommendationsCarousel>
        {matches.map((match) => (
          <ProductMatchCard key={match.product.id} match={match} petName={pet.name} />
        ))}
      </RecommendationsCarousel>
      {!compact && (
        <p className="mt-3 text-xs text-muted">{FOOD_DISCLAIMER}</p>
      )}
    </section>
  )
}
