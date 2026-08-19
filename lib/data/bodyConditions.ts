import type { BodyCondition } from '@/lib/types'

export type BodyConditionOption = {
  id: BodyCondition
  label: string
  description: string
}

export const bodyConditionOptions: BodyConditionOption[] = [
  {
    id: 'delicate',
    label: 'Delicado',
    description: 'Estrutura fina, sensível ou recuperação recente',
  },
  {
    id: 'thin',
    label: 'Magro',
    description: 'Costelas e ossos aparentes',
  },
  {
    id: 'normal',
    label: 'Normal',
    description: 'Peso ideal, boa musculatura',
  },
  {
    id: 'overweight',
    label: 'Acima do peso',
    description: 'Leve acúmulo de gordura',
  },
  {
    id: 'obese',
    label: 'Obeso',
    description: 'Excesso evidente de gordura',
  },
]

export const bodyConditionLabels: Record<BodyCondition, string> = {
  delicate: 'Delicado',
  thin: 'Magro',
  normal: 'Normal',
  overweight: 'Acima do peso',
  obese: 'Obeso',
}

export function mapLegacyActivityLevel(
  activityLevel?: 'low' | 'normal' | 'high'
): BodyCondition {
  if (activityLevel === 'low') return 'thin'
  if (activityLevel === 'high') return 'normal'
  return 'normal'
}
