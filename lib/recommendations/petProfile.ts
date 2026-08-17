import type { FoodProfile, Pet } from '@/lib/types'
import { bodyConditionLabels } from '@/lib/data/bodyConditions'
import { getCurrentAgeMonths, inferLifeStage, inferPetSize } from '@/lib/petAge'

export function buildFoodProfile(pet: Pet): FoodProfile | null {
  if (!pet.weightKg || pet.weightKg <= 0) return null
  if (pet.neutered === undefined || !pet.bodyCondition) return null

  return {
    lifeStage: inferLifeStage(getCurrentAgeMonths(pet)),
    size: inferPetSize(pet.weightKg),
    weightKg: pet.weightKg,
    neutered: pet.neutered,
    bodyCondition: pet.bodyCondition,
  }
}

export function isPetProfileReadyForRecommendations(pet: Pet): boolean {
  return Boolean(
    pet.profileCompleted &&
      pet.weightKg &&
      pet.neutered !== undefined &&
      pet.bodyCondition &&
      (pet.breedId !== 'b1' || pet.coatType)
  )
}

export function getProfileSummaryTags(pet: Pet): string[] {
  const foodProfile = buildFoodProfile(pet)
  if (!foodProfile) return []

  const tags: string[] = []
  const stageLabels = { puppy: 'Filhote', adult: 'Adulto', senior: 'Sênior' }
  const sizeLabels = { small: 'Porte pequeno', medium: 'Porte médio', large: 'Porte grande', giant: 'Porte gigante' }

  tags.push(stageLabels[foodProfile.lifeStage])
  tags.push(sizeLabels[foodProfile.size])
  if (foodProfile.neutered) tags.push('Castrado')
  if (pet.bodyCondition) tags.push(bodyConditionLabels[pet.bodyCondition])

  return tags
}
