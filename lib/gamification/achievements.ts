import type { Achievement } from '@/lib/types'

export const achievementsCatalog: Achievement[] = [
  {
    id: 'primeiro_pedido_whatsapp',
    title: 'Primeiro pedido',
    description: 'Pedido preparado e enviado para o WhatsApp.',
    icon: '🛒',
  },
  {
    id: 'primeira_compra',
    title: 'Primeira compra',
    description: 'Compra confirmada pela loja.',
    icon: '✅',
  },
  {
    id: 'primeiro_agendamento',
    title: 'Primeiro agendamento',
    description: 'Agendou banho e tosa pela primeira vez.',
    icon: '📅',
  },
  {
    id: 'primeiro_banho',
    title: 'Primeiro banho',
    description: 'Primeiro banho realizado pela pet shop.',
    icon: '🛁',
  },
  {
    id: 'primeiro_pet',
    title: 'Primeiro Amigo',
    description: 'Cadastrou o primeiro cachorro.',
    icon: '🐾',
  },
  {
    id: 'familia_pet',
    title: 'Família Pet',
    description: 'Agendou banho para 2 ou mais pets ao mesmo tempo.',
    icon: '👨‍👩‍👧‍👦',
  },
]

export function getAchievementById(id: Achievement['id']) {
  return achievementsCatalog.find((a) => a.id === id)
}

export function evaluateAchievements(
  pets: { profileCompleted?: boolean; firstAppointmentBooked?: boolean; firstBathCompleted?: boolean }[],
  appointments: { petId?: string }[],
  existing: Achievement['id'][]
): Achievement['id'][] {
  const unlocked = new Set(existing)
  if (pets.length >= 1) unlocked.add('primeiro_pet')
  if (pets.some((p) => p.profileCompleted)) unlocked.add('primeiro_pet')
  if (pets.some((p) => p.firstAppointmentBooked)) unlocked.add('primeiro_agendamento')
  if (pets.some((p) => p.firstBathCompleted)) unlocked.add('primeiro_banho')
  if (appointments.length >= 1) unlocked.add('primeiro_agendamento')
  return Array.from(unlocked)
}
