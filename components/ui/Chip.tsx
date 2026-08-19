import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

export function Chip({ className, selected, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        'shrink-0 rounded-chip border px-3.5 py-2 text-sm font-medium font-heading transition-colors',
        selected
          ? 'border-secondary bg-secondary text-white hover:bg-secondary-dark active:bg-secondary-light'
          : 'border-transparent bg-transparent text-secondary hover:bg-secondary/10 active:bg-secondary/20',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
