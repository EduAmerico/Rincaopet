'use client'

import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

interface PetAgeInputProps {
  ageYears: number
  ageMonths?: number
  onChange: (ageYears: number, ageMonths?: number) => void
}

export function PetAgeInput({ ageYears, ageMonths, onChange }: PetAgeInputProps) {
  const isUnderOne = ageYears === 0

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-ink">Quantos anos seu pet tem?</p>

      <div>
        <label className="mb-2 block text-sm text-muted">Anos</label>
        <Input
          type="number"
          min={0}
          max={25}
          value={ageYears}
          onChange={(e) => {
            const years = Math.max(0, Number(e.target.value) || 0)
            if (years === 0) {
              onChange(0, ageMonths ?? 2)
            } else {
              onChange(years, undefined)
            }
          }}
          placeholder="Ex: 3"
        />
        <p className="mt-1 text-xs text-muted">Digite 0 se tiver menos de 1 ano</p>
      </div>

      {isUnderOne && (
        <div>
          <label className="mb-2 block text-sm text-muted">Meses</label>
          <Input
            type="number"
            min={1}
            max={11}
            value={ageMonths ?? ''}
            onChange={(e) => {
              const months = Math.min(11, Math.max(1, Number(e.target.value) || 1))
              onChange(0, months)
            }}
            placeholder="Ex: 6"
          />
        </div>
      )}
    </div>
  )
}
