import type { Pet, PetRegistrationDraft } from '@/lib/types'
import { defaultHealthInfo } from '@/lib/data/healthQuestions'

export function isDraftComplete(draft: PetRegistrationDraft): boolean {
  const needsCoat = draft.breedId === 'b1'
  const ageValid =
    draft.ageYears > 0 || (draft.ageMonths !== undefined && draft.ageMonths > 0)
  return Boolean(
    draft.name.trim().length >= 2 &&
      draft.breedId &&
      ageValid &&
      draft.weightKg > 0 &&
      draft.sex &&
      draft.neutered !== undefined &&
      draft.health &&
      (!needsCoat || draft.coatType)
  )
}

export function petToDraft(pet: Pet): PetRegistrationDraft {
  return {
    name: pet.name,
    breedId: pet.breedId,
    ageYears: pet.ageYears,
    ageMonths: pet.ageMonths,
    weightKg: pet.weightKg ?? 10,
    sex: pet.sex ?? 'male',
    neutered: pet.neutered ?? false,
    bodyCondition: pet.bodyCondition ?? 'normal',
    coatType: pet.coatType,
    health: pet.health ?? { ...defaultHealthInfo },
    preferences: pet.preferences ?? [],
  }
}

export function hasAgeChanged(
  pet: Pet,
  draft: Pick<PetRegistrationDraft, 'ageYears' | 'ageMonths'>
): boolean {
  return pet.ageYears !== draft.ageYears || pet.ageMonths !== draft.ageMonths
}
