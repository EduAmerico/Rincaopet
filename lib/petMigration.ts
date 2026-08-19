import type { BodyCondition, Pet } from '@/lib/types'
import { defaultHealthInfo } from '@/lib/data/healthQuestions'
import { mapLegacyActivityLevel } from '@/lib/data/bodyConditions'

type LegacyPet = {
  id: string
  name: string
  breedId: string
  birthDate?: string
  ageYears?: number
  ageMonths?: number
  ageRecordedAt?: string
  weightKg?: number
  sex?: Pet['sex']
  neutered?: boolean
  bodyCondition?: BodyCondition
  activityLevel?: 'low' | 'normal' | 'high'
  coatType?: Pet['coatType']
  health?: Pet['health']
  preferences?: string[]
  profileCompleted?: boolean
  firstAppointmentBooked?: boolean
  firstBathCompleted?: boolean
  xp?: number
  coins?: number
  level?: number
  createdAt?: string
}

function resolveBodyCondition(legacy: LegacyPet): BodyCondition | undefined {
  if (legacy.bodyCondition) return legacy.bodyCondition
  if (legacy.activityLevel) return mapLegacyActivityLevel(legacy.activityLevel)
  return undefined
}

function inferAgeMonthsFromBirthDate(birthDate: string): number {
  const birth = new Date(birthDate)
  const now = new Date()
  const months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth())
  return Math.max(0, months)
}

function isProfileComplete(pet: Partial<Pet>): boolean {
  return Boolean(
    pet.name &&
      pet.breedId &&
      pet.ageRecordedAt &&
      pet.weightKg &&
      pet.weightKg > 0 &&
      pet.sex &&
      pet.neutered !== undefined
  )
}

function buildMigratedPet(legacy: LegacyPet, overrides: Partial<Pet>): Pet {
  const bodyCondition = resolveBodyCondition(legacy) ?? overrides.bodyCondition ?? 'normal'

  return {
    id: legacy.id,
    name: legacy.name,
    breedId: legacy.breedId,
    ageYears: overrides.ageYears ?? legacy.ageYears ?? 1,
    ageMonths: overrides.ageMonths ?? legacy.ageMonths,
    ageRecordedAt: overrides.ageRecordedAt ?? legacy.ageRecordedAt ?? new Date().toISOString(),
    weightKg: legacy.weightKg,
    sex: legacy.sex,
    neutered: legacy.neutered,
    bodyCondition,
    coatType: legacy.coatType,
    health: legacy.health ?? { ...defaultHealthInfo },
    preferences: legacy.preferences ?? [],
    profileCompleted:
      overrides.profileCompleted ??
      legacy.profileCompleted ??
      isProfileComplete({ ...legacy, bodyCondition } as Pet),
    firstAppointmentBooked: legacy.firstAppointmentBooked ?? false,
    firstBathCompleted: legacy.firstBathCompleted ?? false,
    coins: legacy.coins ?? legacy.xp ?? 0,
    createdAt: legacy.createdAt ?? new Date().toISOString(),
  }
}

export function migratePet(raw: unknown): Pet {
  const legacy = raw as LegacyPet

  if (legacy.ageRecordedAt && legacy.ageYears !== undefined) {
    return buildMigratedPet(legacy, {
      ageYears: legacy.ageYears,
      ageMonths: legacy.ageMonths,
      ageRecordedAt: legacy.ageRecordedAt,
    })
  }

  if (legacy.birthDate) {
    const totalMonths = inferAgeMonthsFromBirthDate(legacy.birthDate)
    const ageYears = totalMonths >= 12 ? Math.floor(totalMonths / 12) : 0
    const ageMonths = totalMonths < 12 ? totalMonths : undefined

    return buildMigratedPet(legacy, {
      ageYears,
      ageMonths,
      ageRecordedAt: new Date().toISOString(),
      profileCompleted: false,
    })
  }

  return {
    id: legacy.id ?? crypto.randomUUID(),
    name: legacy.name ?? 'Pet',
    breedId: legacy.breedId ?? 'b1',
    ageYears: 1,
    ageRecordedAt: new Date().toISOString(),
    weightKg: legacy.weightKg,
    bodyCondition: resolveBodyCondition(legacy) ?? 'normal',
    health: { ...defaultHealthInfo },
    preferences: [],
    profileCompleted: false,
    firstAppointmentBooked: false,
    firstBathCompleted: false,
    coins: legacy.coins ?? legacy.xp ?? 0,
    createdAt: legacy.createdAt ?? new Date().toISOString(),
  }
}

export function migratePets(raw: unknown[]): Pet[] {
  return raw.map(migratePet)
}
