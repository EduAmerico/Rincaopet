'use client'

import Link from 'next/link'
import { CalendarClock, Coins, Droplets, Pencil, PlusCircle } from 'lucide-react'
import { usePets } from '@/lib/hooks/usePets'
import { getBathTypeById } from '@/lib/data/services'
import { getBreedById } from '@/lib/data/breeds'
import { formatPetAge } from '@/lib/petAge'
import { RecommendedForPet } from '@/components/catalogo/RecommendedForPet'
import { CoinsDisplay } from '@/components/banho-tosa/gamification/CoinsDisplay'
import { PetSwitcher } from '@/components/layout/PetSwitcher'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import type { Appointment } from '@/lib/types'

function formatAppointmentWhen(appointment: Appointment) {
  const [year, month, day] = appointment.scheduledDate.split('-')
  return `${day}/${month}/${year} às ${appointment.scheduledTime}`
}

export default function MeuPetPage() {
  const { pets, appointments, activePet, loaded } = usePets()

  const lastAppointment = activePet
    ? appointments
        .filter((appointment) => appointment.petId === activePet.id)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0]
    : undefined

  const lastBathType = lastAppointment
    ? getBathTypeById(lastAppointment.bathTypeId)
    : undefined

  const breed = activePet ? getBreedById(activePet.breedId) : undefined

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink md:text-3xl">Meu pet</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-muted md:text-base">
            Acompanhe banho e tosa, moedas e recomendações do seu pet.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Link href="/banho-tosa/cadastro">
            <Button size="sm">
              <PlusCircle className="h-4 w-4" />
              Cadastrar pet
            </Button>
          </Link>
          {activePet && (
            <Link href={`/banho-tosa/editar/${activePet.id}`}>
              <Button size="sm">
                <Pencil className="h-4 w-4" />
                Editar
              </Button>
            </Link>
          )}
        </div>
      </div>

      {!loaded ? (
        <p className="text-muted">Carregando...</p>
      ) : !activePet ? (
        <Card className="flex flex-col items-start">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-chip bg-secondary/15 text-secondary">
            <PlusCircle className="h-5 w-5" />
          </div>
          <h2 className="font-heading text-lg font-bold text-ink">Cadastre seu primeiro pet</h2>
          <p className="mt-1 text-sm text-muted">
            Com o perfil cadastrado você agenda banho e tosa, acumula moedas e vê produtos recomendados.
          </p>
          <Link href="/banho-tosa/cadastro" className="mt-4">
            <Button>Cadastrar pet</Button>
          </Link>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-heading text-lg font-bold text-ink">{activePet.name}</p>
              <p className="text-sm text-muted">
                {breed?.name ?? 'Raça não informada'} · {formatPetAge(activePet)} ·{' '}
                {activePet.weightKg ?? '—'} kg
              </p>
            </div>
            {pets.length > 1 && <PetSwitcher />}
          </div>

          <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-chip bg-secondary/15 text-secondary">
                  <Droplets className="h-5 w-5" />
                </div>
                <h2 className="font-heading text-lg font-bold text-ink">Banho e tosa</h2>
                <p className="mt-1 text-sm text-muted">
                  Agende o próximo serviço e acompanhe o histórico do {activePet.name}.
                </p>

                <div className="mt-4 flex items-start gap-2 rounded-chip bg-background p-3">
                  <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                      Último agendamento
                    </p>
                    {lastAppointment ? (
                      <>
                        <p className="mt-0.5 font-heading text-sm font-semibold text-ink">
                          {formatAppointmentWhen(lastAppointment)}
                        </p>
                        <p className="text-sm text-muted">
                          {lastBathType?.name ?? 'Serviço de banho e tosa'}
                        </p>
                      </>
                    ) : (
                      <p className="mt-0.5 text-sm text-muted">
                        Nenhum serviço agendado ainda.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <Link href="/banho-tosa/agendar" className="shrink-0 sm:self-start">
                <Button className="w-full sm:w-auto">Agendar banho e tosa</Button>
              </Link>
            </div>
          </Card>

          <Card>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-chip bg-secondary/15 text-secondary">
                <Coins className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-heading text-lg font-bold text-ink">Moedas do {activePet.name}</h2>
                <p className="text-sm text-muted">
                  Acumule moedas para trocar por brindes e descontos.
                </p>
              </div>
            </div>
            <CoinsDisplay coins={activePet.coins} />
            <p className="mt-3 text-sm text-muted">
              Em breve você poderá resgatar as moedas em brindes e descontos na loja.
            </p>
          </Card>

          <RecommendedForPet pet={activePet} />
        </div>
      )}
    </div>
  )
}
