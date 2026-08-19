'use client'

import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        aria-label="Fechar"
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
      />
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-[16px] bg-surface p-5 shadow-elevated',
          'md:bottom-auto md:left-auto md:right-4 md:top-20 md:w-[360px] md:rounded-card md:border md:border-border'
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg font-semibold text-ink">{title}</h2>
          <Button variant="ghost" className="h-9 w-9 p-0" onClick={onClose} aria-label="Fechar filtros">
            <X className="h-5 w-5" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}
