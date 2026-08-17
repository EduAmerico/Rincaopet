import type { BreedGroomingProfile, CoatType } from '@/lib/types'
import { breedGroomingProfiles } from '@/lib/grooming/breedGroomingProfiles'
import { cloneOptions, groomingOptionCatalog as g, SHAVING_WARNING } from '@/lib/grooming/groomingOptions'

export const coatTypeLabels: Record<CoatType, string> = {
  short: 'Curta',
  medium: 'Média',
  long: 'Longa',
  curly: 'Cacheada',
  double: 'Dupla',
  wire: 'Dura/áspera',
}

const srdCoatProfiles: Record<CoatType, BreedGroomingProfile> = {
  short: {
    breedId: 'b1',
    coatType: 'Pelagem curta (SRD)',
    options: cloneOptions([
      g.bathOnly,
      g.skinCare,
      g.sanitary,
      g.nails,
      g.ears,
    ]),
  },
  medium: {
    breedId: 'b1',
    coatType: 'Pelagem média (SRD)',
    options: cloneOptions([
      g.bathOnly,
      g.bathBrush,
      g.sanitary,
      g.pawTrim,
      g.nails,
    ]),
  },
  long: {
    breedId: 'b1',
    coatType: 'Pelagem longa (SRD)',
    options: cloneOptions([
      g.babyCut,
      g.shortCut,
      g.mediumCut,
      g.sanitary,
      g.faceTrim,
      g.longCoatCare,
    ]),
  },
  curly: {
    breedId: 'b1',
    coatType: 'Pelagem cacheada (SRD)',
    options: cloneOptions([
      g.puppyCut,
      g.mediumCut,
      g.scissorCut,
      g.sanitary,
      g.pawTrim,
    ]),
  },
  double: {
    breedId: 'b1',
    coatType: 'Pelagem dupla (SRD)',
    options: cloneOptions([
      g.bathBrush,
      g.deshedding,
      g.sanitary,
      g.pawTrim,
      g.outlineTrim,
      { ...g.lowCut, recommended: false, warning: SHAVING_WARNING },
    ]),
    avoidShaving: true,
    shavingWarning: SHAVING_WARNING,
  },
  wire: {
    breedId: 'b1',
    coatType: 'Pelagem dura/áspera (SRD)',
    options: cloneOptions([
      g.bathOnly,
      g.sanitary,
      g.beardTrim,
      g.pawTrim,
      g.commercialShort,
    ]),
  },
}

export function getSrdProfileByCoatType(coatType: CoatType): BreedGroomingProfile {
  return srdCoatProfiles[coatType]
}

export function getAllCoatTypes(): CoatType[] {
  return ['short', 'medium', 'long', 'curly', 'double', 'wire']
}

export { breedGroomingProfiles }
