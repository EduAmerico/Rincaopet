'use client'

import type { GroomingOption, Pet } from '@/lib/types'
import { getGroomingOptionsForPet } from '@/lib/grooming/groomingMatcher'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'

interface GroomingOptionSelectorProps {
  pet: Pet
  selectedIds: string[]
  onToggle: (optionId: string) => void
}

function OptionCard({
  option,
  selected,
  onToggle,
  highlight,
}: {
  option: GroomingOption
  selected: boolean
  onToggle: () => void
  highlight?: boolean
}) {
  return (
    <button type="button" onClick={onToggle}>
      <Card
        selected={selected}
        className={cn(
          'cursor-pointer text-left',
          selected && 'bg-green-50',
          highlight && 'border-amber-200'
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-semibold text-ink">
              {highlight && '★ '}
              {option.name}
            </h4>
            <p className="mt-1 text-sm text-muted">{option.description}</p>
            {option.warning && (
              <p className="mt-2 text-xs text-amber-700">{option.warning}</p>
            )}
          </div>
          <input
            type="checkbox"
            checked={selected}
            readOnly
            className="mt-1 rounded border-gray-300 text-pet-green"
          />
        </div>
        <p className="mt-3 font-bold text-pet-orange">{formatPrice(option.price)}</p>
      </Card>
    </button>
  )
}

export function GroomingOptionSelector({
  pet,
  selectedIds,
  onToggle,
}: GroomingOptionSelectorProps) {
  const match = getGroomingOptionsForPet(pet)

  if (!match) {
    return (
      <Card className="text-muted">
        {pet.breedId === 'b1'
          ? 'Selecione o tipo de pelagem no cadastro do pet para ver os serviços disponíveis.'
          : 'Perfil de grooming não encontrado para esta raça.'}
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {match.profile.avoidShaving && match.profile.shavingWarning && (
        <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {match.profile.shavingWarning}
        </p>
      )}

      {match.recommended.length > 0 && (
        <section>
          <h3 className="mb-3 font-semibold text-ink">
            Para {pet.name} recomendamos:
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {match.recommended.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                selected={selectedIds.includes(option.id)}
                onToggle={() => onToggle(option.id)}
                highlight
              />
            ))}
          </div>
        </section>
      )}

      {match.other.length > 0 && (
        <section>
          <h3 className="mb-3 font-semibold text-ink">Outras opções:</h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {match.other.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                selected={selectedIds.includes(option.id)}
                onToggle={() => onToggle(option.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
