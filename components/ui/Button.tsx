import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: 'sm' | 'md'
  selected?: boolean
}

const buttonOrange =
  'bg-secondary text-white shadow-card hover:bg-secondary-dark active:bg-secondary-light'

const toggleOn =
  'bg-secondary text-white shadow-card hover:bg-secondary-dark active:bg-secondary-light'

const toggleOff =
  'bg-transparent text-secondary shadow-none hover:bg-secondary/10 active:bg-secondary/20'

const variants: Record<ButtonVariant, string> = {
  primary: buttonOrange,
  secondary: buttonOrange,
  outline: buttonOrange,
  ghost: buttonOrange,
}

const sizes = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', selected, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-pressed={selected}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-chip font-heading font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
          selected === undefined ? variants[variant] : selected ? toggleOn : toggleOff,
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
