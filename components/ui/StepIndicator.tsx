'use client'

import { cn } from '@/lib/utils'

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isDone = stepNumber < currentStep
          return (
            <div key={step} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-heading font-semibold',
                  isActive && 'bg-secondary text-white hover:bg-secondary-dark active:bg-secondary-light',
                  isDone && 'bg-secondary text-white',
                  !isActive && !isDone && 'bg-background text-muted'
                )}
              >
                {isDone ? '✓' : stepNumber}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'hidden h-0.5 flex-1 sm:block',
                    isDone ? 'bg-secondary' : 'bg-border'
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
      <p className="font-heading text-sm font-semibold text-ink">
        {steps[currentStep - 1]}
      </p>
    </div>
  )
}
