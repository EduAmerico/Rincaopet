'use client'

const STEPS = ['Pet', 'Banho', 'Cuidados', 'Data/hora', 'Confirmação'] as const

interface AppointmentProgressProps {
  currentStep: number
}

export function AppointmentProgress({ currentStep }: AppointmentProgressProps) {
  return (
    <div className="mb-6">
      <div className="flex gap-1">
        {STEPS.map((label, index) => {
          const stepNum = index + 1
          const isActive = stepNum === currentStep
          const isDone = stepNum < currentStep
          return (
            <div key={label} className="flex-1">
              <div
                className={`h-1 rounded-full ${
                  isDone || isActive ? 'bg-primary' : 'bg-border'
                } ${isActive ? 'opacity-100' : isDone ? 'opacity-70' : 'opacity-40'}`}
              />
              <p
                className={`mt-1 hidden text-[10px] font-heading font-medium sm:block ${
                  isActive ? 'text-primary' : 'text-muted'
                }`}
              >
                {label}
              </p>
            </div>
          )
        })}
      </div>
      <p className="mt-2 font-heading text-sm font-semibold text-ink sm:hidden">
        Etapa {currentStep} de {STEPS.length}: {STEPS[currentStep - 1]}
      </p>
    </div>
  )
}

export { STEPS as APPOINTMENT_STEPS }
