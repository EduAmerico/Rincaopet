import type { Pet } from '@/lib/types'
import { getActiveHealthAlerts } from '@/lib/data/healthQuestions'
import { Card } from '@/components/ui/Card'

interface PetHealthSummaryProps {
  pet: Pet
}

export function PetHealthSummary({ pet }: PetHealthSummaryProps) {
  const alerts = getActiveHealthAlerts(pet.health)

  if (alerts.length === 0 && !pet.health?.otherNotes) {
    return (
      <Card className="border-green-200 bg-green-50">
        <p className="text-sm font-medium text-green-800">
          Nenhuma condição de saúde informada para {pet.name}.
        </p>
      </Card>
    )
  }

  return (
    <Card className="border-amber-200 bg-amber-50">
      <p className="mb-3 text-sm font-semibold text-amber-900">
        Informações de saúde — {pet.name}
      </p>
      <ul className="space-y-2 text-sm text-amber-900">
        {alerts.map((alert) => (
          <li key={alert.label}>
            <strong>{alert.label}:</strong> {alert.note}
            {alert.medicationDetails && (
              <span className="block text-amber-800">
                Medicamentos: {alert.medicationDetails}
              </span>
            )}
          </li>
        ))}
      </ul>
      {pet.health?.otherNotes && (
        <p className="mt-3 border-t border-amber-200 pt-3 text-sm text-amber-900">
          <strong>Observações:</strong> {pet.health.otherNotes}
        </p>
      )}
    </Card>
  )
}
