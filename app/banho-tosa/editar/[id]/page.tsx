'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { PageHeader } from '@/components/layout/PageHeader'
import { PetRegistrationWizard } from '@/components/banho-tosa/PetRegistrationWizard'
import { usePets } from '@/lib/hooks/usePets'
import { Button } from '@/components/ui/Button'

export default function EditarPetPage() {
  const params = useParams()
  const router = useRouter()
  const petId = params.id as string
  const { getPetById, loaded } = usePets()

  useEffect(() => {
    if (loaded && !getPetById(petId)) {
      router.replace('/banho-tosa')
    }
  }, [getPetById, loaded, petId, router])

  const pet = getPetById(petId)

  return (
    <div>
      <PageHeader
        title={pet ? `Editar perfil de ${pet.name}` : 'Editar perfil'}
        description="Atualize os dados do pet para manter recomendações e serviços personalizados."
      />
      <div className="mb-6">
        <Link href="/banho-tosa">
          <Button variant="ghost">← Voltar</Button>
        </Link>
      </div>
      <PetRegistrationWizard petId={petId} />
    </div>
  )
}
