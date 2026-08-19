'use client'

import { ChevronDown, PawPrint } from 'lucide-react'
import { getBreedById } from '@/lib/data/breeds'
import { usePets } from '@/lib/hooks/usePets'
import { CoinAmount } from '@/components/banho-tosa/gamification/CoinsDisplay'
import { cn } from '@/lib/utils'

export function PetSwitcher({ compact = false }: { compact?: boolean }) {
  const { pets, activePet, activePetId, setActivePet, loaded } = usePets()

  if (!loaded || pets.length === 0 || !activePet) return null

  const breed = getBreedById(activePet.breedId)
  const canSwitch = pets.length > 1

  const visualizer = (
    <div
      className={cn(
        'flex items-center gap-3 rounded-card border border-border bg-surface shadow-card',
        compact ? 'px-2 py-1.5' : 'min-w-[200px] px-3 py-2.5',
        canSwitch && 'pr-2'
      )}
    >
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full bg-secondary/15',
          compact ? 'h-8 w-8' : 'h-12 w-12'
        )}
      >
        {breed?.image ? (
          <img
            src={breed.image}
            alt={breed.name}
            className={cn('object-contain', compact ? 'h-6 w-6' : 'h-9 w-9')}
          />
        ) : (
          <PawPrint className={cn('text-secondary', compact ? 'h-4 w-4' : 'h-6 w-6')} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'truncate font-heading font-bold text-ink',
            compact ? 'text-xs' : 'text-sm'
          )}
        >
          {activePet.name}
        </p>
        <p className={cn('truncate text-muted', compact ? 'text-[10px]' : 'text-xs')}>
          {breed?.name ?? 'Raça não informada'}
        </p>
        <p
          className={cn(
            'font-semibold text-secondary',
            compact ? 'text-[10px]' : 'mt-0.5 text-xs'
          )}
        >
          <CoinAmount amount={activePet.coins} />
        </p>
      </div>
      {canSwitch && <ChevronDown className="h-4 w-4 shrink-0 text-muted" />}
    </div>
  )

  return (
    <div className={cn(compact && 'hidden sm:block', canSwitch && 'relative')}>
      {canSwitch && (
        <label className="sr-only" htmlFor="pet-switcher">
          Selecionar pet
        </label>
      )}
      {visualizer}
      {canSwitch && (
        <select
          id="pet-switcher"
          value={activePetId ?? ''}
          onChange={(e) => setActivePet(e.target.value || null)}
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {pets.map((pet) => (
            <option key={pet.id} value={pet.id}>
              {pet.name}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
