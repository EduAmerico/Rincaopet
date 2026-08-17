'use client'

import { Card } from '@/components/ui/Card'

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
        <label className="mb-2 block text-sm font-medium text-gray-700">Data</label>
        <input
          type="date"
          min={today}
          value={scheduledDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-pet-green focus:outline-none focus:ring-2 focus:ring-pet-green/20"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Horário</label>
        <div className="flex flex-wrap gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => onTimeChange(slot)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                scheduledTime === slot
                  ? 'bg-pet-green text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>
    </Card>
  )
}
