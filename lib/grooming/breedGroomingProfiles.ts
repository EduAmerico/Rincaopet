import type { BreedGroomingProfile } from '@/lib/types'
import {
  cloneOptions,
  groomingOptionCatalog as g,
  SHAVING_WARNING,
} from '@/lib/grooming/groomingOptions'

function profile(
  breedId: string,
  coatType: string,
  options: ReturnType<typeof cloneOptions>,
  extra?: Partial<BreedGroomingProfile>
): BreedGroomingProfile {
  return {
    breedId,
    coatType,
    options: cloneOptions(options),
    ...extra,
  }
}

export const breedGroomingProfiles: BreedGroomingProfile[] = [
  profile('b6', 'Pelagem dupla média-longa', [
    g.bathBrush,
    g.deshedding,
    g.sanitary,
    g.pawTrim,
    g.outlineTrim,
    { ...g.lowCut, recommended: false, warning: SHAVING_WARNING },
  ], { avoidShaving: true, shavingWarning: SHAVING_WARNING }),

  profile('b5', 'Pelagem curta densa', [
    g.bathOnly,
    { ...g.bathBrush, name: 'Escovação' },
    g.deshedding,
    g.sanitary,
    g.nails,
    g.ears,
  ]),

  profile('b10', 'Pelagem curta', [
    g.bathOnly,
    g.skinCare,
    g.sanitary,
    g.nails,
    g.ears,
  ]),

  profile('b2', 'Pelagem cacheada', [
    g.puppyCut,
    g.lowCut,
    g.mediumCut,
    g.scissorCut,
    g.lambCut,
    g.sanitary,
    g.pawTrim,
    g.faceTrim,
  ]),

  profile('b3', 'Pelagem longa', [
    g.babyCut,
    g.shortCut,
    g.mediumCut,
    g.scissorCut,
    g.sanitary,
    g.faceTrim,
    g.longCoatCare,
  ]),

  profile('b11', 'Pelagem longa fina', [
    g.babyCut,
    g.shortCut,
    g.mediumCut,
    g.sanitary,
    g.faceTrim,
    g.longCoatCare,
  ]),

  profile('b13', 'Pelagem longa branca', [
    g.babyCut,
    g.mediumCut,
    g.scissorCut,
    g.sanitary,
    g.faceTrim,
    g.longCoatCare,
  ]),

  profile('b14', 'Pelagem longa', [
    g.babyCut,
    g.shortCut,
    g.mediumCut,
    g.sanitary,
    g.faceTrim,
    g.longCoatCare,
  ]),

  profile('b15', 'Pelagem dura', [
    g.schnauzerStandard,
    g.sanitary,
    g.beardTrim,
    g.browTrim,
    g.pawTrim,
    g.commercialShort,
  ]),

  profile('b16', 'Pelagem média ondulada', [
    g.cockerStandard,
    g.shortCut,
    g.scissorCut,
    g.sanitary,
    g.pawTrim,
    g.earTrim,
    g.deshedding,
  ]),

  profile('b17', 'Pelagem dupla espessa', [
    g.bathOnly,
    g.deshedding,
    g.sanitary,
    g.pawTrim,
    g.outlineTrim,
    g.longCoatCare,
  ], { avoidShaving: true, shavingWarning: SHAVING_WARNING }),

  profile('b8', 'Pelagem dupla', [
    g.bathOnly,
    g.deshedding,
    g.deepBrush,
    g.sanitary,
    g.pawTrim,
  ], { avoidShaving: true, shavingWarning: SHAVING_WARNING }),

  profile('b9', 'Pelagem dupla média', [
    g.bathOnly,
    g.bathBrush,
    g.deshedding,
    g.sanitary,
    g.pawTrim,
    g.outlineTrim,
  ], { avoidShaving: true, shavingWarning: SHAVING_WARNING }),

  profile('b7', 'Pelagem dupla', [
    g.bathOnly,
    g.bathBrush,
    g.deshedding,
    g.sanitary,
    g.pawTrim,
    g.nails,
  ], { avoidShaving: true, shavingWarning: SHAVING_WARNING }),

  profile('b12', 'Pelagem espessa', [
    g.bathOnly,
    g.deepBrush,
    g.deshedding,
    g.sanitary,
    g.pawTrim,
    g.outlineTrim,
  ], { avoidShaving: true, shavingWarning: SHAVING_WARNING }),

  profile('b4', 'Pelagem curta', [
    g.bathOnly,
    g.bathBrush,
    g.sanitary,
    g.nails,
    g.ears,
    g.foldCare,
  ]),

  profile('b18', 'Pelagem curta', [
    g.bathOnly,
    g.bathBrush,
    g.deshedding,
    g.sanitary,
    g.nails,
    g.foldCare,
  ]),

  profile('b19', 'Pelagem curta', [
    g.bathOnly,
    g.bathBrush,
    g.sanitary,
    g.nails,
    g.ears,
  ]),
]

export function getBreedGroomingProfile(breedId: string): BreedGroomingProfile | undefined {
  return breedGroomingProfiles.find((p) => p.breedId === breedId)
}
