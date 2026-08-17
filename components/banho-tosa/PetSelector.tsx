'use client'

import { getBreedById } from '@/lib/data/breeds'
import type { Pet } from '@/lib/types'
import { formatPetAge } from '@/lib/petAge'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'

interface PetSelectorProps {
  pets: Pet[]
  selectedPetIds: string[]
  onToggle: (petId: string) => void
}

export function PetSelector({ pets, selectedPetIds, onToggle }: PetSelectorProps) {
  if (pets.length === 0) {
    return (
      <Card className="text-center text-gray-600">
        Nenhum pet cadastrado. Cadastre um cachorro primeiro.
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {pets.map((pet) => {
        const breed = getBreedById(pet.breedId)
        const selected = selectedPetIds.includes(pet.id)

        return (
          <button key={pet.id} type="button" onClick={() => onToggle(pet.id)}>
            <Card
              selected={selected}
              className={cn('cursor-pointer text-left', selected && 'bg-green-50')}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{pet.name}</h3>
                  <p className="text-sm text-gray-500">
                    {pet.weightKg ?? '—'} kg · {formatPetAge(pet)}
                  </p>
                  {breed && (
                    <p className="mt-1 text-xs text-gray-500">{breed.name}</p>
                  )}
                </div>
                <input
                  type="checkbox"
                  checked={selected}
                  readOnly
                  className="mt-1 rounded border-gray-300 text-pet-green"
                />
              </div>
            </Card>
          </button>
        )
      })}
    </div>
  )
}
