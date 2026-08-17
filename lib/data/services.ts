import type { BathType } from '@/lib/types'

export const bathTypes: BathType[] = [
  {
    id: 'banho-simples',
    name: 'Banho Simples',
    description: 'Banho completo com shampoo neutro e secagem.',
    price: 60,
    durationMin: 45,
  },
  {
    id: 'banho-medicinal',
    name: 'Banho Medicinal',
    description: 'Banho terapêutico com produtos específicos para pele sensível.',
    price: 85,
    durationMin: 60,
  },
  {
    id: 'banho-antipulgas',
    name: 'Banho Antipulgas',
    description: 'Banho com tratamento antipulgas e antiparasitário.',
    price: 95,
    durationMin: 55,
  },
]

export function getBathTypeById(id: string) {
  return bathTypes.find((b) => b.id === id)
}
