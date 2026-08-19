import type { GroomingOption, GroomingServiceType } from '@/lib/types'

const SHAVING_WARNING =
  'Pelagem dupla: raspagem não é recomendada como cuidado estético de rotina.'

function opt(
  id: string,
  name: string,
  description: string,
  serviceType: GroomingServiceType,
  price: number,
  recommended: boolean,
  warning?: string
): GroomingOption {
  return { id, name, description, serviceType, price, recommended, warning }
}

const bathBrush = opt(
  'bath-brush',
  'Escovação',
  'Escovação completa da pelagem durante o atendimento.',
  'coat-care',
  35,
  true
)
const bathOnly = opt('bath-only', 'Banho', 'Banho completo com secagem.', 'coat-care', 60, true)
const deshedding = opt(
  'deshedding',
  'Deslanagem',
  'Remoção de subpelo e pelos mortos.',
  'deshedding',
  45,
  true
)
const sanitary = opt(
  'sanitary',
  'Tosa higiênica',
  'Aparo nas regiões íntimas, patas e focinho.',
  'sanitary',
  35,
  true
)
const pawTrim = opt(
  'paw-trim',
  'Acabamento de patas',
  'Aparo e acabamento nas patas.',
  'paw-trim',
  25,
  true
)
const outlineTrim = opt(
  'outline-trim',
  'Acabamento de contorno',
  'Acabamento leve no contorno da pelagem.',
  'outline-trim',
  40,
  false
)
const deepBrush = opt(
  'deep-brush',
  'Escovação profunda',
  'Escovação intensiva para remoção de subpelo.',
  'deshedding',
  40,
  true
)
const nails = opt('nails', 'Unhas', 'Corte e lixamento de unhas.', 'coat-care', 20, true)
const ears = opt('ears', 'Cuidados de orelhas', 'Limpeza e higienização das orelhas.', 'coat-care', 20, true)
const skinCare = opt(
  'skin-care',
  'Cuidados de pele/pelagem',
  'Cuidados específicos para pelo curto.',
  'coat-care',
  30,
  true
)
const foldCare = opt(
  'fold-care',
  'Cuidados de dobras',
  'Limpeza e higienização de dobras da pele.',
  'coat-care',
  25,
  true
)

const puppyCut = opt(
  'puppy-cut',
  'Tosa filhote / Puppy Cut',
  'Tosa uniforme e fofa, ideal para manutenção.',
  'haircut',
  70,
  true
)
const lowCut = opt(
  'low-cut',
  'Tosa baixa',
  'Tosa curta com máquina.',
  'haircut',
  65,
  true,
  SHAVING_WARNING
)
const mediumCut = opt('medium-cut', 'Tosa média', 'Tosa de comprimento médio.', 'haircut', 75, true)
const scissorCut = opt(
  'scissor-cut',
  'Tosa na tesoura',
  'Acabamento artesanal com tesoura.',
  'haircut',
  85,
  true
)
const lambCut = opt(
  'lamb-cut',
  'Tosa estilo cordeiro',
  'Tosa arredondada estilo cordeiro.',
  'haircut',
  80,
  true
)
const babyCut = opt('baby-cut', 'Tosa bebê', 'Tosa curta e prática estilo bebê.', 'haircut', 70, true)
const shortCut = opt('short-cut', 'Tosa curta', 'Tosa curta para manutenção.', 'haircut', 60, true)
const faceTrim = opt(
  'face-trim',
  'Acabamento de rosto',
  'Acabamento na região facial.',
  'outline-trim',
  30,
  true
)
const longCoatCare = opt(
  'long-coat-care',
  'Manutenção de pelagem longa',
  'Escovação e organização de pelagem longa.',
  'coat-care',
  50,
  false
)
const schnauzerStandard = opt(
  'schnauzer-standard',
  'Tosa padrão Schnauzer',
  'Tosa tradicional da raça Schnauzer.',
  'haircut',
  85,
  true
)
const beardTrim = opt(
  'beard-trim',
  'Acabamento de barba',
  'Acabamento na barba e bigode.',
  'outline-trim',
  25,
  true
)
const browTrim = opt(
  'brow-trim',
  'Acabamento de sobrancelhas',
  'Aparo leve na região das sobrancelhas.',
  'outline-trim',
  20,
  true
)
const commercialShort = opt(
  'commercial-short',
  'Tosa curta comercial',
  'Tosa curta prática para manutenção.',
  'haircut',
  60,
  false
)
const cockerStandard = opt(
  'cocker-standard',
  'Tosa padrão da raça',
  'Tosa tradicional Cocker Spaniel.',
  'haircut',
  85,
  true
)
const earTrim = opt(
  'ear-trim',
  'Acabamento de orelhas',
  'Acabamento na pelagem das orelhas.',
  'outline-trim',
  25,
  true
)

export const groomingOptionCatalog = {
  bathBrush,
  bathOnly,
  deshedding,
  sanitary,
  pawTrim,
  outlineTrim,
  deepBrush,
  nails,
  ears,
  skinCare,
  foldCare,
  puppyCut,
  lowCut,
  mediumCut,
  scissorCut,
  lambCut,
  babyCut,
  shortCut,
  faceTrim,
  longCoatCare,
  schnauzerStandard,
  beardTrim,
  browTrim,
  commercialShort,
  cockerStandard,
  earTrim,
}

export { SHAVING_WARNING }

export function cloneOptions(options: GroomingOption[]): GroomingOption[] {
  return options.map((o) => ({ ...o }))
}
