'use client'

import { usePets } from '@/lib/hooks/usePets'
import { useTutor } from '@/lib/hooks/useTutor'
import { PetSwitcher } from '@/components/layout/PetSwitcher'
import {
  HomeHeroOnboarding,
  HomeHeroPersonalized,
  QuickActions,
} from '@/components/home/HomeSections'

export function HomeContent() {
  const { pets, activePet, loaded: petsLoaded } = usePets()
  const { name: tutorName, loaded: tutorLoaded } = useTutor()

  if (!petsLoaded || !tutorLoaded) {
    return <p className="text-muted">Carregando...</p>
  }

  const hasPet = pets.length > 0 && activePet

  if (!hasPet) {
    return <HomeHeroOnboarding tutorName={tutorName} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <HomeHeroPersonalized tutorName={tutorName} pet={activePet} />
        </div>
        <PetSwitcher />
      </div>

      <QuickActions petName={activePet.name} petId={activePet.id} />
    </div>
  )
}
