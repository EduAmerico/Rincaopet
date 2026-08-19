import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

type BadgeVariant = 'default' | 'primary' | 'secondary' | 'outline' | 'muted'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-secondary/15 text-secondary',
  primary: 'bg-primary text-white',
  secondary: 'bg-soft-gold text-ink',
  outline: 'border border-border bg-surface text-muted',
  muted: 'bg-background text-muted',
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-chip px-2 py-0.5 text-[11px] font-medium font-heading',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
