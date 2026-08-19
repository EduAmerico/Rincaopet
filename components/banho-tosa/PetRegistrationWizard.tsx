'use client'



import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { defaultHealthInfo } from '@/lib/data/healthQuestions'

import { getBreedById } from '@/lib/data/breeds'

import { getAchievementById } from '@/lib/gamification/achievements'

import { getActiveHealthAlerts } from '@/lib/data/healthQuestions'

import { petToDraft } from '@/lib/petDraft'

import { formatPetAgeFromDraft } from '@/lib/petAge'

import { usePets } from '@/lib/hooks/usePets'

import type { Achievement, Pet, PetRegistrationDraft, PetSex } from '@/lib/types'

import { Button } from '@/components/ui/Button'

import { Card } from '@/components/ui/Card'

import { Input } from '@/components/ui/Input'

import { StepIndicator } from '@/components/ui/StepIndicator'

import { BreedSelector } from '@/components/banho-tosa/BreedSelector'

import { CoatTypeSelector } from '@/components/banho-tosa/CoatTypeSelector'

import { PetAgeInput } from '@/components/banho-tosa/PetAgeInput'

import { PetHealthForm } from '@/components/banho-tosa/PetHealthForm'

import { ProfileCompleteActions } from '@/components/banho-tosa/ProfileCompleteActions'

import { AchievementToast } from '@/components/banho-tosa/gamification/AchievementToast'

import { CoinAmount } from '@/components/banho-tosa/gamification/CoinsDisplay'

import { COINS_NEW_PET } from '@/lib/gamification/coins'



const baseSteps = ['Nome', 'Raça', 'Idade', 'Perfil', 'Saúde', 'Resumo']



const initialDraft: PetRegistrationDraft = {

  name: '',

  breedId: '',

  ageYears: 2,

  weightKg: 10,

  sex: 'male',

  neutered: false,

  bodyCondition: 'normal',

  health: { ...defaultHealthInfo },

  preferences: [],

}



interface PetRegistrationWizardProps {

  petId?: string

}



export function PetRegistrationWizard({ petId }: PetRegistrationWizardProps) {

  const router = useRouter()

  const { registerPet, updatePet, getPetById, loaded } = usePets()

  const isEditMode = Boolean(petId)



  const [currentStep, setCurrentStep] = useState(1)

  const [draft, setDraft] = useState<PetRegistrationDraft>(initialDraft)

  const [initialized, setInitialized] = useState(!isEditMode)

  const [showComplete, setShowComplete] = useState(false)

  const [toastAchievements, setToastAchievements] = useState<Achievement[]>([])

  const [savedPet, setSavedPet] = useState<Pet | null>(null)



  useEffect(() => {

    if (!isEditMode || !loaded || initialized) return

    const pet = getPetById(petId!)

    if (!pet) {

      router.replace('/banho-tosa')

      return

    }

    setDraft(petToDraft(pet))

    setInitialized(true)

  }, [getPetById, initialized, isEditMode, loaded, petId, router])



  const isSrd = draft.breedId === 'b1'

  const steps = isSrd ? [...baseSteps.slice(0, 4), 'Pelagem', 'Saúde', 'Resumo'] : baseSteps

  const totalSteps = steps.length

  const selectedBreed = draft.breedId ? getBreedById(draft.breedId) : undefined

  const healthAlerts = getActiveHealthAlerts(draft.health)



  function getStepKind(): string {

    return steps[currentStep - 1] ?? ''

  }



  function canProceed() {

    const kind = getStepKind()

    if (kind === 'Nome') return draft.name.trim().length >= 2

    if (kind === 'Raça') return draft.breedId.length > 0

    if (kind === 'Idade') {

      return draft.ageYears > 0 || (draft.ageMonths !== undefined && draft.ageMonths > 0)

    }

    if (kind === 'Perfil') {

      return draft.weightKg > 0 && draft.sex

    }

    if (kind === 'Pelagem') return Boolean(draft.coatType)

    if (kind === 'Saúde') return Boolean(draft.health)

    return true

  }



  function handleNext() {

    if (!canProceed()) return

    if (currentStep < totalSteps) {

      setCurrentStep((s) => s + 1)

      return

    }



    if (isEditMode && petId) {

      const pet = updatePet(petId, draft)

      setSavedPet(pet)

      setShowComplete(true)

      return

    }



    const result = registerPet(draft)

    setSavedPet(result.pet)

    setShowComplete(true)



    const achievements = result.newAchievements

      .map((id) => getAchievementById(id))

      .filter((a): a is Achievement => Boolean(a))

    setToastAchievements(achievements)

  }



  function handleBack() {

    if (currentStep > 1) setCurrentStep((s) => s - 1)

  }



  function handleCompleteClose() {

    setShowComplete(false)

    if (isEditMode) {

      router.push('/banho-tosa')

      return

    }

    router.push('/banho-tosa/agendar')

  }



  if (isEditMode && (!loaded || !initialized)) {

    return <p className="text-muted">Carregando perfil...</p>

  }



  const stepKind = getStepKind()



  return (

    <>

      <div className="space-y-8">

        <StepIndicator steps={steps} currentStep={currentStep} />



        {stepKind === 'Nome' && (

          <Card>

            <h2 className="font-heading text-xl font-bold text-ink">Qual é o nome do seu cachorro?</h2>

            <Input

              className="mt-4"

              placeholder="Ex: Thor, Luna, Bob..."

              value={draft.name}

              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}

            />

          </Card>

        )}



        {stepKind === 'Raça' && (

          <div>

            <h2 className="mb-4 font-heading text-xl font-bold text-ink">Escolha a raça</h2>

            <BreedSelector

              selectedBreedId={draft.breedId}

              onSelect={(breedId) => setDraft((d) => ({ ...d, breedId, coatType: undefined }))}

            />

          </div>

        )}



        {stepKind === 'Idade' && (

          <Card>

            <PetAgeInput

              ageYears={draft.ageYears}

              ageMonths={draft.ageMonths}

              onChange={(ageYears, ageMonths) =>

                setDraft((d) => ({ ...d, ageYears, ageMonths }))

              }

            />

          </Card>

        )}



        {stepKind === 'Perfil' && (

          <Card className="space-y-5">

            <h2 className="font-heading text-xl font-bold text-ink">Perfil do pet</h2>

            <div>

              <label className="mb-2 block font-heading text-sm font-medium text-ink">

                Peso (kg): {draft.weightKg}

              </label>

              <input

                type="range"

                min={1}

                max={70}

                value={draft.weightKg}

                onChange={(e) =>

                  setDraft((d) => ({ ...d, weightKg: Number(e.target.value) }))

                }

                className="w-full accent-secondary"

              />

            </div>

            <div>

              <p className="mb-2 font-heading text-sm font-medium text-ink">Sexo</p>

              <div className="flex gap-2">

                {(['male', 'female'] as PetSex[]).map((sex) => (

                  <Button

                    key={sex}

                    type="button"

                    variant={draft.sex === sex ? 'primary' : 'outline'}

                    selected={draft.sex === sex}

                    onClick={() => setDraft((d) => ({ ...d, sex }))}

                  >

                    {sex === 'male' ? 'Macho' : 'Fêmea'}

                  </Button>

                ))}

              </div>

            </div>

            <div>

              <p className="mb-2 font-heading text-sm font-medium text-ink">Castrado?</p>

              <div className="flex gap-2">

                <Button

                  type="button"

                  variant={draft.neutered ? 'primary' : 'outline'}

                  selected={draft.neutered}

                  onClick={() => setDraft((d) => ({ ...d, neutered: true }))}

                >

                  Sim

                </Button>

                <Button

                  type="button"

                  variant={!draft.neutered ? 'secondary' : 'outline'}

                  selected={!draft.neutered}

                  onClick={() => setDraft((d) => ({ ...d, neutered: false }))}

                >

                  Não

                </Button>

              </div>

            </div>

          </Card>

        )}



        {stepKind === 'Pelagem' && (

          <Card>

            <h2 className="mb-4 font-heading text-xl font-bold text-ink">Como é a pelagem?</h2>

            <CoatTypeSelector

              selected={draft.coatType}

              onSelect={(coatType) => setDraft((d) => ({ ...d, coatType }))}

            />

          </Card>

        )}



        {stepKind === 'Saúde' && (

          <PetHealthForm

            health={draft.health}

            onChange={(health) => setDraft((d) => ({ ...d, health }))}

          />

        )}



        {stepKind === 'Resumo' && selectedBreed && (

          <Card className="space-y-4">

            <h2 className="font-heading text-xl font-bold text-ink">

              {isEditMode ? 'Resumo das alterações' : 'Resumo do cadastro'}

            </h2>

            <div className="space-y-2 rounded-xl bg-gray-50 p-4 text-sm">

              <p><span className="font-semibold text-secondary">Nome:</span> <span className="text-gray-500">{draft.name}</span></p>

              <p><span className="font-semibold text-secondary">Raça:</span> <span className="text-gray-500">{selectedBreed.name}</span></p>

              <p><span className="font-semibold text-secondary">Idade:</span> <span className="text-gray-500">{formatPetAgeFromDraft(draft.ageYears, draft.ageMonths)}</span></p>

              <p><span className="font-semibold text-secondary">Peso:</span> <span className="text-gray-500">{draft.weightKg} kg</span></p>

              <p><span className="font-semibold text-secondary">Sexo:</span> <span className="text-gray-500">{draft.sex === 'male' ? 'Macho' : 'Fêmea'}</span></p>

              <p><span className="font-semibold text-secondary">Castrado:</span> <span className="text-gray-500">{draft.neutered ? 'Sim' : 'Não'}</span></p>

              {draft.coatType && <p><span className="font-semibold text-secondary">Pelagem:</span> <span className="text-gray-500">{draft.coatType}</span></p>}

              {healthAlerts.length > 0 && (

                <div className="border-t border-gray-200 pt-2">

                  <p className="font-semibold text-secondary">Alertas de saúde:</p>

                  <ul className="mt-1 list-disc pl-4 text-gray-500">

                    {healthAlerts.map((a) => (

                      <li key={a.label}>{a.label}</li>

                    ))}

                  </ul>

                </div>

              )}

              {draft.health.otherNotes && (

                <p><span className="font-semibold text-secondary">Observações:</span> <span className="text-gray-500">{draft.health.otherNotes}</span></p>

              )}

            </div>

            {!isEditMode && (

              <p className="rounded-card bg-secondary/15 p-4 text-sm font-medium text-secondary">

                +<CoinAmount amount={COINS_NEW_PET} /> por cadastrar um novo pet

              </p>

            )}

          </Card>

        )}



        <div className="flex justify-between">

          <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1}>

            Voltar

          </Button>

          <Button onClick={handleNext} disabled={!canProceed()}>

            {currentStep === totalSteps

              ? isEditMode

                ? 'Salvar alterações'

                : 'Finalizar cadastro'

              : 'Próximo'}

          </Button>

        </div>

      </div>



      {showComplete && savedPet && !isEditMode && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <ProfileCompleteActions pet={savedPet} onClose={handleCompleteClose} />

        </div>

      )}



      {showComplete && savedPet && isEditMode && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <Card className="mx-auto max-w-md text-center">

            <p className="text-sm font-semibold uppercase tracking-wide text-secondary">

              Perfil atualizado!

            </p>

            <h2 className="mt-2 font-heading text-2xl font-bold text-ink">

              {savedPet.name} foi atualizado com sucesso

            </h2>

            <p className="mt-2 text-muted">

              Recomendações de produtos e serviços serão recalculadas com base no novo perfil.

            </p>

            <div className="mt-6 flex flex-col gap-3">

              <Button className="w-full" onClick={handleCompleteClose}>

                Voltar para Meu pet

              </Button>

              <Button

                variant="outline"

                className="w-full"

                onClick={() => router.push(`/catalogo?petId=${savedPet.id}`)}

              >

                Ver produtos para {savedPet.name}

              </Button>

            </div>

          </Card>

        </div>

      )}



      <AchievementToast

        achievements={toastAchievements}

        onClose={() => setToastAchievements([])}

      />

    </>

  )

}


