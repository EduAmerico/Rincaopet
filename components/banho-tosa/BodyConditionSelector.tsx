'use client'

import type { BodyCondition } from '@/lib/types'
import { bodyConditionOptions } from '@/lib/data/bodyConditions'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { BodyConditionIcon } from '@/components/banho-tosa/BodyConditionIcon'

interface BodyConditionSelectorProps {
  selected: BodyCondition | undefined
  onSelect: (condition: BodyCondition) => void
}

export function BodyConditionSelector({ selected, onSelect }: BodyConditionSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {bodyConditionOptions.map((option) => {
        const isSelected = selected === option.id
        return (
          <button key={option.id} type="button" onClick={() => onSelect(option.id)}>
            <Card
              selected={isSelected}
              className={cn(
                'cursor-pointer text-center transition-colors',
                isSelected ? 'bg-green-50 text-pet-green' : 'text-gray-700'
              )}
            >
              <div className="mb-2 flex justify-center">
                <BodyConditionIcon condition={option.id} className="h-14 w-14" />
              </div>
              <p className="font-semibold text-gray-900">{option.label}</p>
              <p className="mt-1 text-xs text-gray-500">{option.description}</p>
            </Card>
          </button>
        )
      })}
    </div>
  )
}
