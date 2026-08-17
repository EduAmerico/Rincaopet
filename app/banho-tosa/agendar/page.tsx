'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getAchievementById } from '@/lib/gamification/achievements'
import { getBathTypeById } from '@/lib/data/services'
import { calculateGroomingTotal } from '@/lib/grooming/groomingMatcher'
import { usePets } from '@/lib/hooks/usePets'
import type { Achievement } from '@/lib/types'
import { PageHeader } from '@/components/layout/PageHeader'
import { PetSelector } from '@/components/banho-tosa/PetSelector'
import { BathSelector } from '@/components/banho-tosa/BathSelector'
import { GroomingOptionSelector } from '@/components/banho-tosa/GroomingOptionSelector'
import { SchedulePicker } from '@/components/banho-tosa/SchedulePicker'
import { AppointmentSummary } from '@/components/banho-tosa/AppointmentSummary'
import { AchievementToast } from '@/components/banho-tosa/gamification/AchievementToast'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function AgendarPage() {
  const router = useRouter()
  const { pets, loaded, createAppointment } = usePets()
  const [selectedPetId, setSelectedPetId] = useState('')
  const [bathTypeId, setBathTypeId] = useState('')
  const [groomingOptionIds, setGroomingOptionIds] = useState<string[]>([])
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [toastAchievements, setToastAchievements] = useState<Achievement[]>([])

  const selectedPet = pets.find((p) => p.id === selectedPetId) ?? null

  useEffect(() => {
    if (loaded && pets.length === 0) {
      router.replace('/banho-tosa/cadastro')
    }
  }, [loaded, pets.length, router])

  useEffect(() => {
    setGroomingOptionIds([])
  }, [selectedPetId])

  function togglePet(petId: string) {
    setSelectedPetId((prev) => (prev === petId ? '' : petId))
  }

  function toggleGroomingOption(optionId: string) {
    setGroomingOptionIds((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
    )
  }

  function handleConfirm() {
    const bath = getBathTypeById(bathTypeId)
    if (!bath || !selectedPet || groomingOptionIds.length === 0) return
    if (!scheduledDate || !scheduledTime) return

    setLoading(true)
    const groomingTotal = calculateGroomingTotal(groomingOptionIds, selectedPet)
    const totalPrice = bath.price + groomingTotal

    const result = createAppointment({
      petId: selectedPet.id,
      bathTypeId,
      groomingOptionIds,
      scheduledDate,
      scheduledTime,
      totalPrice,
    })

    const achievements = result.newAchievements
      .map((id) => getAchievementById(id))
      .filter((a): a is Achievement => Boolean(a))
    setToastAchievements(achievements)
    setConfirmed(true)
    setLoading(false)
  }

  if (!loaded) {
    return <p className="text-gray-600">Carregando...</p>
  }

  if (confirmed && selectedPet) {
    return (
      <div>
        <Card className="mx-auto max-w-lg text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-pet-green">
            Agendamento confirmado!
          </p>
          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            {selectedPet.name} — {scheduledDate} às {scheduledTime}
          </h2>
          <p className="mt-2 text-gray-600">
            O primeiro agendamento foi registrado. O banho será confirmado após o atendimento.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/banho-tosa">
              <Button variant="outline">Voltar ao hub</Button>
            </Link>
            <Button
              onClick={() => {
                setConfirmed(false)
                setSelectedPetId('')
                setBathTypeId('')
                setGroomingOptionIds([])
                setScheduledDate('')
                setScheduledTime('')
              }}
            >
              Novo agendamento
            </Button>
          </div>
        </Card>
        <AchievementToast
          achievements={toastAchievements}
          onClose={() => setToastAchievements([])}
        />
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Agendar banho e tosa"
        description="Selecione o pet e veja os serviços recomendados para a raça dele."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <section>
            <h2 className="mb-3 text-lg font-semibold text-gray-900">1. Selecionar pet</h2>
            <PetSelector
              pets={pets}
              selectedPetIds={selectedPetId ? [selectedPetId] : []}
              onToggle={togglePet}
            />
          </section>

          {selectedPet && (
            <>
              <section>
                <h2 className="mb-3 text-lg font-semibold text-gray-900">2. Tipo de banho</h2>
                <BathSelector selectedBathId={bathTypeId} onSelect={setBathTypeId} />
              </section>

              <section>
                <h2 className="mb-3 text-lg font-semibold text-gray-900">
                  3. Serviços de pelagem
                </h2>
                <GroomingOptionSelector
                  pet={selectedPet}
                  selectedIds={groomingOptionIds}
                  onToggle={toggleGroomingOption}
                />
              </section>

              <section>
                <h2 className="mb-3 text-lg font-semibold text-gray-900">4. Data e horário</h2>
                <SchedulePicker
                  scheduledDate={scheduledDate}
                  scheduledTime={scheduledTime}
                  onDateChange={setScheduledDate}
                  onTimeChange={setScheduledTime}
                />
              </section>
            </>
          )}
        </div>

        <AppointmentSummary
          pet={selectedPet}
          bathTypeId={bathTypeId}
          groomingOptionIds={groomingOptionIds}
          scheduledDate={scheduledDate}
          scheduledTime={scheduledTime}
          onConfirm={handleConfirm}
          loading={loading}
        />
      </div>

      <AchievementToast
        achievements={toastAchievements}
        onClose={() => setToastAchievements([])}
      />
    </div>
  )
}
