import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-chip border border-border bg-surface px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-2 focus:ring-primary/15',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
