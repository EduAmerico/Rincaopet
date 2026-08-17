import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean
}

export function Card({ className, selected, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-white p-5 shadow-sm transition-all',
        selected ? 'border-pet-green ring-2 ring-pet-green/30' : 'border-gray-200 hover:border-gray-300',
        className
      )}
      {...props}
    />
  )
}
