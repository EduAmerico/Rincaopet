import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean
  padding?: 'sm' | 'md'
}

export function Card({ className, selected, padding = 'md', ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-card border bg-surface shadow-card transition-all',
        padding === 'md' ? 'p-4 md:p-5' : 'p-3',
        selected
          ? 'border-primary ring-2 ring-primary/20'
          : 'border-border hover:border-primary/20',
        className
      )}
      {...props}
    />
  )
}
