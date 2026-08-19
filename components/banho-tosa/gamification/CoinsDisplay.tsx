import { Coins } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CoinAmountProps {
  amount: number
  className?: string
}

export function CoinAmount({ amount, className }: CoinAmountProps) {
  return (
    <span className={cn('inline-flex items-center gap-0.5', className)}>
      {amount}
      <Coins className="h-[1em] w-[1em] shrink-0" aria-hidden />
      <span className="sr-only">{amount === 1 ? 'moeda' : 'moedas'}</span>
    </span>
  )
}

interface CoinsDisplayProps {
  coins: number
  compact?: boolean
  className?: string
}

export function CoinsDisplay({ coins, compact, className }: CoinsDisplayProps) {
  return (
    <p
      className={cn(
        'font-heading font-semibold text-secondary',
        compact ? 'text-xs' : 'text-lg',
        className
      )}
    >
      <CoinAmount amount={coins} />
    </p>
  )
}
