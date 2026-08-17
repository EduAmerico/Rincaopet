import {
  calculateLevel,
  xpForNextLevel,
  xpProgressInLevel,
} from '@/lib/gamification/xpCalculator'
import { cn } from '@/lib/utils'

interface XpBarProps {
  xp: number
  compact?: boolean
  className?: string
}

export function XpBar({ xp, compact, className }: XpBarProps) {
  const level = calculateLevel(xp)
  const progress = xpProgressInLevel(xp)
  const nextLevelXp = xpForNextLevel(xp)

  return (
    <div className={cn('w-full', className)}>
      {!compact && (
        <div className="mb-1 flex items-center justify-between text-xs font-medium text-gray-600">
          <span>Nível {level}</span>
          <span>
            {xp} / {nextLevelXp} XP
          </span>
        </div>
      )}
      <div className="h-2.5 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pet-green to-pet-orange transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
