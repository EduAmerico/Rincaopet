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
import { AppointmentProgress } from '@/components/banho-tosa/AppointmentProgress'
import { AchievementToast } from '@/components/banho-tosa/gamification/AchievementToast'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function AgendarPage() {
  const router = useRouter()
  const { pets, loaded, createAppointment } = usePets()
  const [step, setStep] = useState(1)
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
    setBathTypeId('')
    setScheduledDate('')
    setScheduledTime('')
  }, [selectedPetId])

  function togglePet(petId: string) {
    setSelectedPetId((prev) => (prev === petId ? '' : petId))
  }

  function toggleGroomingOption(optionId: string) {
    setGroomingOptionIds((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]
    )
  }

  function canAdvanceFromStep(s: number) {
    if (s === 1) return Boolean(selectedPetId)
    if (s === 2) return Boolean(bathTypeId)
    if (s === 3) return groomingOptionIds.length > 0
    if (s === 4) return Boolean(scheduledDate && scheduledTime)
    return true
  }

  function handleConfirm() {
    const bath = getBathTypeById(bathTypeId)
    if (!bath || !selectedPet) return

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
    return <p className="text-muted">Carregando...</p>
  }

  if (confirmed && selectedPet) {
    return (
      <div>
        <Card className="mx-auto max-w-lg text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Agendamento confirmado
          </p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-ink">
            {selectedPet.name} — {scheduledDate} às {scheduledTime}
          </h2>
          <p className="mt-2 text-sm text-muted">
            Nossa equipe receberá as informações de saúde do pet para o atendimento.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/banho-tosa">
              <Button variant="outline">Voltar</Button>
            </Link>
            <Button
              onClick={() => {
                setConfirmed(false)
                setStep(1)
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
        description="Siga as etapas para montar o atendimento ideal."
      />

      <AppointmentProgress currentStep={step} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {step >= 1 && (
            <section className={step !== 1 ? 'opacity-60' : ''}>
              <h2 className="mb-3 font-heading text-lg font-semibold text-ink">1. Pet</h2>
              {step === 1 ? (
                <>
                  <PetSelector
                    pets={pets}
                    selectedPetIds={selectedPetId ? [selectedPetId] : []}
                    onToggle={togglePet}
                  />
                  <Button
                    className="mt-4"
                    disabled={!canAdvanceFromStep(1)}
                    onClick={() => setStep(2)}
                  >
                    Continuar
                  </Button>
                </>
              ) : (
                selectedPet && (
                  <Card className="bg-secondary/15">
                    <p className="font-heading font-semibold text-ink">{selectedPet.name}</p>
                    <Button variant="ghost" size="sm" className="mt-2" onClick={() => setStep(1)}>
                      Alterar
                    </Button>
                  </Card>
                )
              )}
            </section>
          )}

          {step >= 2 && selectedPet && (
            <section className={step !== 2 ? 'opacity-60' : ''}>
              <h2 className="mb-3 font-heading text-lg font-semibold text-ink">2. Banho</h2>
              {step === 2 ? (
                <>
                  <BathSelector selectedBathId={bathTypeId} onSelect={setBathTypeId} />
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Voltar
                    </Button>
                    <Button disabled={!canAdvanceFromStep(2)} onClick={() => setStep(3)}>
                      Continuar
                    </Button>
                  </div>
                </>
              ) : (
                bathTypeId && (
                  <Card>
                    <p className="text-sm text-ink">{getBathTypeById(bathTypeId)?.name}</p>
                    <Button variant="ghost" size="sm" className="mt-2" onClick={() => setStep(2)}>
                      Alterar
                    </Button>
                  </Card>
                )
              )}
            </section>
          )}

          {step >= 3 && selectedPet && (
            <section className={step !== 3 ? 'opacity-60' : ''}>
              <h2 className="mb-3 font-heading text-lg font-semibold text-ink">
                3. Cuidados recomendados
              </h2>
              {step === 3 ? (
                <>
                  <GroomingOptionSelector
                    pet={selectedPet}
                    selectedIds={groomingOptionIds}
                    onToggle={toggleGroomingOption}
                  />
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Voltar
                    </Button>
                    <Button disabled={!canAdvanceFromStep(3)} onClick={() => setStep(4)}>
                      Continuar
                    </Button>
                  </div>
                </>
              ) : (
                groomingOptionIds.length > 0 && (
                  <Card>
                    <p className="text-sm text-muted">{groomingOptionIds.length} serviço(s)</p>
                    <Button variant="ghost" size="sm" className="mt-2" onClick={() => setStep(3)}>
                      Alterar
                    </Button>
                  </Card>
                )
              )}
            </section>
          )}

          {step >= 4 && selectedPet && (
            <section className={step !== 4 ? 'opacity-60' : ''}>
              <h2 className="mb-3 font-heading text-lg font-semibold text-ink">4. Data e horário</h2>
              {step === 4 ? (
                <>
                  <SchedulePicker
                    scheduledDate={scheduledDate}
                    scheduledTime={scheduledTime}
                    onDateChange={setScheduledDate}
                    onTimeChange={setScheduledTime}
                  />
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" onClick={() => setStep(3)}>
                      Voltar
                    </Button>
                    <Button disabled={!canAdvanceFromStep(4)} onClick={() => setStep(5)}>
                      Revisar
                    </Button>
                  </div>
                </>
              ) : (
                scheduledDate && (
                  <Card>
                    <p className="text-sm text-ink">
                      {scheduledDate} às {scheduledTime}
                    </p>
                    <Button variant="ghost" size="sm" className="mt-2" onClick={() => setStep(4)}>
                      Alterar
                    </Button>
                  </Card>
                )
              )}
            </section>
          )}

          {step === 5 && selectedPet && (
            <section>
              <h2 className="mb-3 font-heading text-lg font-semibold text-ink">5. Confirmação</h2>
              <p className="mb-4 text-sm text-muted">
                Revise os detalhes no resumo ao lado e confirme o agendamento.
              </p>
              <Button variant="outline" onClick={() => setStep(4)}>
                Voltar
              </Button>
            </section>
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
          showConfirm={step === 5}
        />
      </div>

      <AchievementToast
        achievements={toastAchievements}
        onClose={() => setToastAchievements([])}
      />
    </div>
  )
}
