'use client'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

const timeSlots = ['09:00', '10:30', '14:00', '15:30', '17:00']

interface SchedulePickerProps {
  scheduledDate: string
  scheduledTime: string
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
}

export function SchedulePicker({
  scheduledDate,
  scheduledTime,
  onDateChange,
  onTimeChange,
}: SchedulePickerProps) {
  const today = new Date().toISOString().slice(0, 10)

  return (
    <Card className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-ink">Data</label>
        <input
          type="date"
          min={today}
          value={scheduledDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-pet-green focus:outline-none focus:ring-2 focus:ring-pet-green/20"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-ink">Horário</label>
        <div className="flex flex-wrap gap-2">
          {timeSlots.map((slot) => (
            <Button
              key={slot}
              type="button"
              selected={scheduledTime === slot}
              onClick={() => onTimeChange(slot)}
            >
              {slot}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  )
}
