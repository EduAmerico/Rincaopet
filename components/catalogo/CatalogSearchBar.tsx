'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/Input'

interface CatalogSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function CatalogSearchBar({ value, onChange }: CatalogSearchBarProps) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
      <Input
        className="pl-10"
        placeholder="Buscar produtos..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
