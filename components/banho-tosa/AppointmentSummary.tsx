'use client'

import { getBathTypeById } from '@/lib/data/services'
import { getBreedById } from '@/lib/data/breeds'
import {
  calculateGroomingTotal,
  getGroomingOptionById,
} from '@/lib/grooming/groomingMatcher'
import type { Pet } from '@/lib/types'
import { calculateAppointmentCoins } from '@/lib/gamification/coins'
import { formatPrice } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { CoinAmount } from '@/components/banho-tosa/gamification/CoinsDisplay'
import { PetHealthSummary } from '@/components/banho-tosa/PetHealthSummary'

interface AppointmentSummaryProps {
  pet: Pet | null
  bathTypeId: string
  groomingOptionIds: string[]
  scheduledDate: string
  scheduledTime: string
  onConfirm: () => void
  loading?: boolean
  showConfirm?: boolean
}

export function AppointmentSummary({
  pet,
  bathTypeId,
  groomingOptionIds,
  scheduledDate,
  scheduledTime,
  onConfirm,
  loading,
  showConfirm = true,
}: AppointmentSummaryProps) {
  const bath = getBathTypeById(bathTypeId)
  const groomingTotal = pet ? calculateGroomingTotal(groomingOptionIds, pet) : 0
  const totalPrice = (bath?.price ?? 0) + groomingTotal
  const coinsEarned = calculateAppointmentCoins()

  const canConfirm =
    pet &&
    bathTypeId.length > 0 &&
    groomingOptionIds.length > 0 &&
    scheduledDate.length > 0 &&
    scheduledTime.length > 0

  const breed = pet ? getBreedById(pet.breedId) : undefined

  return (
    <Card className="sticky top-24 space-y-4">
      <h3 className="font-heading text-lg font-bold text-ink">Resumo</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-muted">Pet</span>
          <span className="font-medium text-ink">{pet?.name ?? '—'}</span>
        </div>
        {breed && (
          <div className="flex justify-between gap-4">
            <span className="text-muted">Raça</span>
            <span className="font-medium text-ink">{breed.name}</span>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <span className="text-muted">Banho</span>
          <span className="font-medium text-ink">{bath?.name ?? '—'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted">Data</span>
          <span className="font-medium text-ink">{scheduledDate || '—'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-muted">Horário</span>
          <span className="font-medium text-ink">{scheduledTime || '—'}</span>
        </div>
        <div className="flex justify-between gap-4 border-t border-border pt-2">
          <span className="font-heading font-semibold text-ink">Total</span>
          <span className="font-heading text-lg font-bold text-primary">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <p className="text-xs text-muted">
          +<CoinAmount amount={coinsEarned} /> ao confirmar
        </p>
      </div>

      {pet && groomingOptionIds.length > 0 && (
        <ul className="space-y-1 rounded-chip bg-background p-3 text-sm">
          {groomingOptionIds.map((id) => {
            const option = getGroomingOptionById(pet, id)
            return option ? (
              <li key={id} className="text-ink">
                {option.name} — {formatPrice(option.price)}
              </li>
            ) : null
          })}
        </ul>
      )}

      {pet && <PetHealthSummary pet={pet} />}

      {showConfirm && (
        <Button className="w-full" disabled={!canConfirm || loading} onClick={onConfirm}>
          {loading ? 'Confirmando...' : 'Confirmar agendamento'}
        </Button>
      )}
    </Card>
  )
}
