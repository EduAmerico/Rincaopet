'use client'

import Link from 'next/link'
import { Dog, Droplets, Pencil, PlusCircle, ShoppingBag } from 'lucide-react'
import { usePets } from '@/lib/hooks/usePets'
import { getBreedById } from '@/lib/data/breeds'
import { formatPetAge } from '@/lib/petAge'
import { PageHeader } from '@/components/layout/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function BanhoTosaPage() {
  const { pets, loaded } = usePets()

  return (
    <div>
      <PageHeader
        title="Banho e Tosa"
        description="Cadastre o perfil do pet e agende serviços personalizados por raça."
      />

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="flex flex-col">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-pet-orange">
            <PlusCircle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Cadastrar pet</h2>
          <p className="mt-2 flex-1 text-sm text-gray-600">
            Perfil progressivo: idade, peso, sexo, castração e condição corporal para
            personalizar produtos e serviços.
          </p>
          <Link href="/banho-tosa/cadastro" className="mt-4">
            <Button variant="secondary" className="w-full">
              Começar cadastro
            </Button>
          </Link>
        </Card>

        <Card className="flex flex-col">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-pet-green">
            <Droplets className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Agendar banho e tosa</h2>
          <p className="mt-2 flex-1 text-sm text-gray-600">
            Serviços de pelagem recomendados automaticamente conforme a raça do pet.
          </p>
          <Link href="/banho-tosa/agendar" className="mt-4">
            <Button className="w-full">Agendar agora</Button>
          </Link>
        </Card>
      </div>

      {loaded && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
            <Dog className="h-5 w-5" />
            Meus pets ({pets.length})
          </h2>

          {pets.length === 0 ? (
            <Card className="text-center text-gray-600">
              Nenhum pet cadastrado ainda. Comece pelo cadastro do perfil!
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {pets.map((pet) => {
                const breed = getBreedById(pet.breedId)
                return (
                  <Card key={pet.id} className="flex flex-col">
                    <h3 className="font-semibold text-gray-900">{pet.name}</h3>
                    <p className="text-sm text-gray-500">
                      {formatPetAge(pet)} · {pet.weightKg ?? '—'} kg
                    </p>
                    {breed && (
                      <p className="mt-1 text-sm text-gray-600">{breed.name}</p>
                    )}
                    <p className="mt-2 text-xs text-gray-500">
                      {pet.profileCompleted ? 'Perfil completo ✓' : 'Perfil incompleto'}
                    </p>
                    <div className="mt-4 flex flex-col gap-2">
                      <Link href={`/banho-tosa/editar/${pet.id}`}>
                        <Button variant="outline" className="w-full">
                          <Pencil className="h-4 w-4" />
                          Editar perfil
                        </Button>
                      </Link>
                      {pet.profileCompleted && (
                        <Link
                          href={`/catalogo?petId=${pet.id}`}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-pet-green px-5 py-2.5 text-sm font-semibold text-pet-green transition hover:bg-green-50"
                        >
                          <ShoppingBag className="h-4 w-4" />
                          Ver produtos
                        </Link>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          )}
        </section>
      )}
    </div>
  )
}
