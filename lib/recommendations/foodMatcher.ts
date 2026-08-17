import { products } from '@/lib/data/products'
import type { FoodProfile, Pet, Product, ProductMatch } from '@/lib/types'
import { buildFoodProfile } from '@/lib/recommendations/petProfile'

const stageLabels = { puppy: 'filhotes', adult: 'adultos', senior: 'sênior' }
const sizeLabels = {
  small: 'porte pequeno',
  medium: 'porte médio',
  large: 'porte grande',
  giant: 'porte gigante',
}

function isFoodProduct(product: Product): boolean {
  return product.category === 'racao' && !product.isTherapeutic
}

function scoreProduct(product: Product, profile: FoodProfile, breedId: string): ProductMatch | null {
  if (!isFoodProduct(product)) return null

  let score = 0
  const reasons: string[] = []
  const maxScore = 100

  if (product.recommendedLifeStages?.includes(profile.lifeStage)) {
    score += 30
    reasons.push(`Indicada para cães ${stageLabels[profile.lifeStage]}`)
  } else if (product.recommendedLifeStages?.length) {
    return null
  } else {
    score += 10
  }

  if (product.recommendedSizes?.includes(profile.size)) {
    score += 25
    reasons.push(`Adequada para ${sizeLabels[profile.size]}`)
  } else if (product.recommendedSizes?.length) {
    score -= 10
  } else {
    score += 5
  }

  if (profile.neutered && product.forNeutered) {
    score += 20
    reasons.push('Opção para cães castrados')
  } else if (profile.neutered && product.energyProfile === 'light') {
    score += 15
    reasons.push('Perfil calórico mais leve')
  }

  if (profile.bodyCondition === 'thin' && product.energyProfile === 'high-energy') {
    score += 15
    reasons.push('Compatível com pets magros que precisam ganhar peso')
  } else if (
    (profile.bodyCondition === 'overweight' || profile.bodyCondition === 'obese') &&
    product.energyProfile === 'light'
  ) {
    score += 20
    reasons.push('Perfil calórico leve para controle de peso')
  } else if (
    (profile.bodyCondition === 'delicate' || profile.bodyCondition === 'normal') &&
    product.energyProfile === 'standard'
  ) {
    score += 10
    reasons.push('Compatível com a condição corporal informada')
  } else if (profile.bodyCondition === 'delicate' && product.energyProfile === 'light') {
    score += 12
    reasons.push('Opção mais leve para pets delicados')
  }

  if (product.breedIds?.includes(breedId)) {
    score += 10
    reasons.push('Compatível com a raça cadastrada')
  }

  const normalized = Math.min(maxScore, Math.max(0, Math.round(score)))

  if (normalized < 40) return null

  return { product, score: normalized, reasons }
}

export function matchFoodProductsForPet(pet: Pet, limit = 5): ProductMatch[] {
  const profile = buildFoodProfile(pet)
  if (!profile) return []

  return products
    .map((product) => scoreProduct(product, profile, pet.breedId))
    .filter((match): match is ProductMatch => match !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

export const FOOD_DISCLAIMER =
  'As sugestões são baseadas no perfil cadastrado e nas características dos produtos. Necessidades nutricionais específicas devem ser avaliadas por um médico-veterinário.'
