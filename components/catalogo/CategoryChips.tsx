'use client'

import { catalogNavCategories, type CatalogNavCategory } from '@/lib/catalog/categories'
import { Chip } from '@/components/ui/Chip'

interface CategoryChipsProps {
  selected: CatalogNavCategory
  onSelect: (category: CatalogNavCategory) => void
}

export function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 scrollbar-hide md:mx-0 md:px-0">
      <div className="flex gap-2 pb-1">
        {catalogNavCategories.map((cat) => (
          <Chip
            key={cat.id}
            selected={selected === cat.id}
            onClick={() => onSelect(cat.id)}
          >
            {cat.label}
          </Chip>
        ))}
      </div>
    </div>
  )
}
