'use client'

import { bathTypes } from '@/lib/data/services'
import { formatPrice } from '@/lib/utils'
import { Card } from '@/components/ui/Card'

interface BathSelectorProps {
  selectedBathId: string
  onSelect: (id: string) => void
}

export function BathSelector({ selectedBathId, onSelect }: BathSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      {bathTypes.map((bath) => (
        <button key={bath.id} type="button" onClick={() => onSelect(bath.id)}>
          <Card selected={selectedBathId === bath.id} className="cursor-pointer text-left">
            <h4 className="font-semibold text-gray-900">{bath.name}</h4>
            <p className="mt-1 text-sm text-gray-500">{bath.description}</p>
            <p className="mt-3 text-sm font-medium text-gray-600">{bath.durationMin} min</p>
            <p className="mt-1 font-bold text-pet-orange">{formatPrice(bath.price)}</p>
          </Card>
        </button>
      ))}
    </div>
  )
}
