'use client'

import type { PetHealthInfo } from '@/lib/data/healthQuestions'
import { healthQuestions } from '@/lib/data/healthQuestions'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'

interface PetHealthFormProps {
  health: PetHealthInfo
  onChange: (health: PetHealthInfo) => void
}

export function PetHealthForm({ health, onChange }: PetHealthFormProps) {
  function toggleField(key: keyof PetHealthInfo, value: boolean) {
    onChange({ ...health, [key]: value })
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Informações de saúde</h2>
        <p className="mt-1 text-sm text-gray-500">
          Essas informações ajudam os profissionais a cuidar do seu pet com segurança.
          Não substituem avaliação veterinária.
        </p>
      </div>

      {healthQuestions.map((question) => (
        <Card key={question.key} className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-gray-900">{question.label}</p>
              <p className="mt-1 text-sm text-gray-600">{question.description}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => toggleField(question.key, true)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  health[question.key]
                    ? 'bg-pet-green text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Sim
              </button>
              <button
                type="button"
                onClick={() => toggleField(question.key, false)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  !health[question.key]
                    ? 'bg-gray-700 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Não
              </button>
            </div>
          </div>

          {question.key === 'controlledMedication' && health.controlledMedication && (
            <Input
              placeholder="Quais medicamentos? (opcional)"
              value={health.medicationDetails ?? ''}
              onChange={(e) =>
                onChange({ ...health, medicationDetails: e.target.value })
              }
            />
          )}
        </Card>
      ))}

      <Card>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Observações adicionais para a equipe
        </label>
        <textarea
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-pet-green focus:ring-2 focus:ring-pet-green/20"
          rows={3}
          placeholder="Ex: medo de secador, região sensível na pata direita..."
          value={health.otherNotes ?? ''}
          onChange={(e) => onChange({ ...health, otherNotes: e.target.value })}
        />
      </Card>
    </div>
  )
}
