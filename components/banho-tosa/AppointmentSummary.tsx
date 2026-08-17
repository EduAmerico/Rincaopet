'use client'

import { getBathTypeById } from '@/lib/data/services'
import { getBreedById } from '@/lib/data/breeds'
import {
  calculateGroomingTotal,
  getGroomingOptionById,
} from '@/lib/grooming/groomingMatcher'
import type { Pet } from '@/lib/types'
import { calculateAppointmentXp } from '@/lib/gamification/xpCalculator'
import { formatPrice } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { PetHealthSummary } from '@/components/banho-tosa/PetHealthSummary'

interface AppointmentSummaryProps {
  pet: Pet | null
  bathTypeId: string
  groomingOptionIds: string[]
  scheduledDate: string
  scheduledTime: string
  onConfirm: () => void
  loading?: boolean
}

export function AppointmentSummary({
  pet,
  bathTypeId,
  groomingOptionIds,
  scheduledDate,
  scheduledTime,
  onConfirm,
  loading,
}: AppointmentSummaryProps) {
  const bath = getBathTypeById(bathTypeId)
  const groomingTotal = pet ? calculateGroomingTotal(groomingOptionIds, pet) : 0
  const totalPrice = (bath?.price ?? 0) + groomingTotal
  const xpEarned = calculateAppointmentXp()

  const canConfirm =
    pet &&
    bathTypeId.length > 0 &&
    groomingOptionIds.length > 0 &&
    scheduledDate.length > 0 &&
    scheduledTime.length > 0

  const breed = pet ? getBreedById(pet.breedId) : undefined

  return (
    <Card className="sticky top-24 space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Resumo do agendamento</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Pet</span>
          <span className="font-medium">{pet?.name ?? '—'}</span>
        </div>
        {breed && (
          <div className="flex justify-between">
            <span className="text-gray-600">Raça</span>
            <span className="font-medium">{breed.name}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Banho</span>
          <span className="font-medium">{bath?.name ?? '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Data</span>
          <span className="font-medium">{scheduledDate || '—'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Horário</span>
          <span className="font-medium">{scheduledTime || '—'}</span>
        </div>
        <div className="flex justify-between border-t border-gray-100 pt-2">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="text-lg font-bold text-pet-orange">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">XP estimado</span>
          <span className="font-semibold text-pet-green">+{xpEarned} XP</span>
        </div>
      </div>

      {pet && groomingOptionIds.length > 0 && (
        <ul className="space-y-1 rounded-xl bg-gray-50 p-3 text-sm">
          {groomingOptionIds.map((id) => {
            const option = getGroomingOptionById(pet, id)
            return option ? (
              <li key={id} className="text-gray-700">
                {option.name} — {formatPrice(option.price)}
              </li>
            ) : null
          })}
        </ul>
      )}

      {pet && <PetHealthSummary pet={pet} />}

      <Button className="w-full" disabled={!canConfirm || loading} onClick={onConfirm}>
        {loading ? 'Confirmando...' : 'Confirmar agendamento'}
      </Button>
    </Card>
  )
}
