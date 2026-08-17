import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      {steps.map((label, index) => {
        const stepNumber = index + 1
        const isActive = stepNumber === currentStep
        const isCompleted = stepNumber < currentStep

        return (
          <div key={label} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors',
                isCompleted && 'bg-pet-green text-white',
                isActive && 'bg-pet-orange text-white',
                !isActive && !isCompleted && 'bg-gray-200 text-gray-500'
              )}
            >
              {stepNumber}
            </div>
            <span
              className={cn(
                'hidden text-center text-xs font-medium sm:block',
                isActive ? 'text-pet-orange' : 'text-gray-500'
              )}
            >
              {label}
            </span>
          </div>
        )
      })}
    </div>
  )
}
