import type { GroomingMatchResult, Pet } from '@/lib/types'
import { SRD_BREED_ID } from '@/lib/types'
import { getBreedGroomingProfile } from '@/lib/grooming/breedGroomingProfiles'
import { getSrdProfileByCoatType } from '@/lib/grooming/coatTypes'
import type { GroomingOption } from '@/lib/types'

function isDuplicateBathOption(option: GroomingOption): boolean {
  return option.id === 'bath-only' || /^banho\b/i.test(option.name)
}

function splitOptions(options: GroomingOption[]): {
  recommended: GroomingOption[]
  other: GroomingOption[]
} {
  const extras = options.filter((o) => !isDuplicateBathOption(o))
  return {
    recommended: extras.filter((o) => o.recommended),
    other: extras.filter((o) => !o.recommended),
  }
}

export function getGroomingOptionsForPet(pet: Pet): GroomingMatchResult | null {
  let profile

  if (pet.breedId === SRD_BREED_ID) {
    if (!pet.coatType) return null
    profile = getSrdProfileByCoatType(pet.coatType)
  } else {
    profile = getBreedGroomingProfile(pet.breedId)
  }

  if (!profile) return null

  const { recommended, other } = splitOptions(profile.options)
  return { recommended, other, profile }
}

export function getGroomingOptionById(
  pet: Pet,
  optionId: string
): GroomingOption | undefined {
  const match = getGroomingOptionsForPet(pet)
  if (!match) return undefined
  return [...match.recommended, ...match.other].find((o) => o.id === optionId)
}

export function calculateGroomingTotal(optionIds: string[], pet: Pet): number {
  return optionIds.reduce((sum, id) => {
    const option = getGroomingOptionById(pet, id)
    return sum + (option?.price ?? 0)
  }, 0)
}
