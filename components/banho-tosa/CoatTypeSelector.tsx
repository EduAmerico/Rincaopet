'use client'

import type { CoatType } from '@/lib/types'
import { coatTypeLabels } from '@/lib/grooming/coatTypes'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'

interface CoatTypeSelectorProps {
  selected: CoatType | undefined
  onSelect: (coatType: CoatType) => void
}

const coatTypes: CoatType[] = ['short', 'medium', 'long', 'curly', 'double', 'wire']

export function CoatTypeSelector({ selected, onSelect }: CoatTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {coatTypes.map((coat) => (
        <button key={coat} type="button" onClick={() => onSelect(coat)}>
          <Card
            selected={selected === coat}
            className={cn('cursor-pointer text-center', selected === coat && 'bg-green-50')}
          >
            <p className="font-semibold text-gray-900">{coatTypeLabels[coat]}</p>
          </Card>
        </button>
      ))}
    </div>
  )
}
