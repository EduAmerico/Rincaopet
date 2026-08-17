'use client'

import Link from 'next/link'
import type { ProductMatch } from '@/lib/types'
import { formatProductPriceLabel } from '@/lib/products/display'
import { Card } from '@/components/ui/Card'

interface ProductMatchCardProps {
  match: ProductMatch
  petName: string
}

export function ProductMatchCard({ match, petName }: ProductMatchCardProps) {
  const { product, score, reasons } = match

  return (
    <Link href={`/catalogo/${product.id}`}>
      <Card className="flex h-full flex-col transition hover:border-pet-green hover:shadow-md">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-pet-green">
            {score}% compatível
          </span>
        </div>
        <div className="mb-3 flex h-24 items-center justify-center rounded-xl bg-gray-50">
          <img src={product.image} alt={product.name} className="h-16 w-16 object-contain" />
        </div>
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <p className="mt-1 text-sm font-medium text-pet-orange">
          {formatProductPriceLabel(product)}
        </p>
        <ul className="mt-3 space-y-1 text-xs text-gray-600">
          {reasons.slice(0, 3).map((reason) => (
            <li key={reason}>✓ {reason}</li>
          ))}
        </ul>
        <p className="mt-auto pt-3 text-[10px] text-gray-400">
          Boa compatibilidade com o perfil de {petName}
        </p>
      </Card>
    </Link>
  )
}
