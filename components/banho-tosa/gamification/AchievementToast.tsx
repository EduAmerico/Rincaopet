'use client'

import { useEffect } from 'react'
import type { Achievement } from '@/lib/types'
import { Card } from '@/components/ui/Card'

interface AchievementToastProps {
  achievements: Achievement[]
  onClose: () => void
}

export function AchievementToast({ achievements, onClose }: AchievementToastProps) {
  useEffect(() => {
    if (achievements.length === 0) return
    const timer = setTimeout(onClose, 5000)
    return () => clearTimeout(timer)
  }, [achievements, onClose])

  if (achievements.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex max-w-sm flex-col gap-3">
      {achievements.map((achievement) => (
        <Card
          key={achievement.id}
          className="animate-slide-up border-amber-200 bg-amber-50 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">{achievement.icon}</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                Conquista desbloqueada!
              </p>
              <p className="font-bold text-ink">{achievement.title}</p>
              <p className="text-sm text-muted">{achievement.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
