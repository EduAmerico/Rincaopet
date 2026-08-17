import type { LifeStage, Pet } from '@/lib/types'

export function getTotalAgeMonthsAtRecord(pet: Pick<Pet, 'ageYears' | 'ageMonths'>): number {
  if (pet.ageYears === 0) return pet.ageMonths ?? 0
  return pet.ageYears * 12
}

export function getCurrentAgeMonths(
  pet: Pick<Pet, 'ageYears' | 'ageMonths' | 'ageRecordedAt'>
): number {
  const recordedMonths = getTotalAgeMonthsAtRecord(pet)
  const recordedAt = new Date(pet.ageRecordedAt)
  const now = new Date()
  const elapsedMonths =
    (now.getFullYear() - recordedAt.getFullYear()) * 12 +
    (now.getMonth() - recordedAt.getMonth())
  return Math.max(0, recordedMonths + elapsedMonths)
}

export function inferLifeStage(totalMonths: number): LifeStage {
  if (totalMonths < 12) return 'puppy'
  if (totalMonths >= 84) return 'senior'
  return 'adult'
}

export function inferPetSize(weightKg: number): import('@/lib/types').PetSize {
  if (weightKg < 10) return 'small'
  if (weightKg < 25) return 'medium'
  if (weightKg < 45) return 'large'
  return 'giant'
}

export function formatPetAge(pet: Pick<Pet, 'ageYears' | 'ageMonths' | 'ageRecordedAt'>): string {
  const totalMonths = getCurrentAgeMonths(pet)
  if (totalMonths < 12) return `${totalMonths} meses`
  const years = Math.floor(totalMonths / 12)
  const remainingMonths = totalMonths % 12
  if (remainingMonths === 0) return `${years} ${years === 1 ? 'ano' : 'anos'}`
  return `${years}a ${remainingMonths}m`
}

export function formatPetAgeFromDraft(
  ageYears: number,
  ageMonths?: number
): string {
  if (ageYears === 0) return `${ageMonths ?? 0} meses`
  return `${ageYears} ${ageYears === 1 ? 'ano' : 'anos'}`
}

export function getLifeStageFromPet(
  pet: Pick<Pet, 'ageYears' | 'ageMonths' | 'ageRecordedAt'>
): LifeStage {
  return inferLifeStage(getCurrentAgeMonths(pet))
}
