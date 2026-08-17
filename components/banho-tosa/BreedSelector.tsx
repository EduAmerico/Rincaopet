'use client'

import { breeds } from '@/lib/data/breeds'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'

interface BreedSelectorProps {
  selectedBreedId: string
  onSelect: (breedId: string) => void
}

export function BreedSelector({ selectedBreedId, onSelect }: BreedSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {breeds.map((breed) => {
        const selected = breed.id === selectedBreedId
        return (
          <button key={breed.id} type="button" onClick={() => onSelect(breed.id)}>
            <Card
              selected={selected}
              className={cn('cursor-pointer text-left', selected && 'bg-green-50')}
            >
              <div className="mb-3 flex h-20 items-center justify-center rounded-xl bg-gray-50">
                <img src={breed.image} alt={breed.name} className="h-14 w-14 object-contain" />
              </div>
              <h3 className="font-semibold text-gray-900">{breed.name}</h3>
            </Card>
          </button>
        )
      })}
    </div>
  )
}
