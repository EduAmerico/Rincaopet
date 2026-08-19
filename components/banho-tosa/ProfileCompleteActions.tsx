'use client'

import Link from 'next/link'
import type { Pet } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

interface ProfileCompleteActionsProps {
  pet: Pet
  onClose?: () => void
}

export function ProfileCompleteActions({ pet, onClose }: ProfileCompleteActionsProps) {
  const isFemale = pet.sex === 'female'

  return (
    <Card className="mx-auto max-w-md text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-pet-green">
        Perfil d{isFemale ? 'a' : 'o'} {pet.name} completo 🎉
      </p>
      <p className="mt-2 text-muted">
        Agora podemos personalizar produtos e serviços para o perfil{' '}
        {isFemale ? 'dela' : 'dele'}.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <Link href={`/catalogo?petId=${pet.id}`} onClick={onClose}>
          <Button className="w-full">Ver produtos para {pet.name}</Button>
        </Link>
        <Link href="/banho-tosa/agendar" onClick={onClose}>
          <Button variant="secondary" className="w-full">
            Agendar banho e tosa
          </Button>
        </Link>
        {onClose && (
          <Button variant="ghost" className="w-full" onClick={onClose}>
            Fechar
          </Button>
        )}
      </div>
    </Card>
  )
}
