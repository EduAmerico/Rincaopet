'use client'



import { useCallback, useEffect, useState } from 'react'

import { evaluateAchievements } from '@/lib/gamification/achievements'

import {

  calculateAppointmentXp,

  calculateLevel,

  calculateNewPetXp,

  calculatePurchaseXp,

} from '@/lib/gamification/xpCalculator'

import { getBreedById } from '@/lib/data/breeds'

import { getCurrentAgeMonths } from '@/lib/petAge'

import { migratePets } from '@/lib/petMigration'

import { hasAgeChanged, isDraftComplete } from '@/lib/petDraft'



import type {

  AchievementId,

  Appointment,

  Pet,

  PetRegistrationDraft,

} from '@/lib/types'



const PETS_KEY = 'petshop_pets'

const APPOINTMENTS_KEY = 'petshop_appointments'

const ACHIEVEMENTS_KEY = 'petshop_achievements'

const ACTIVE_PET_KEY = 'petshop_active_pet'



function readStorage<T>(key: string, fallback: T): T {

  if (typeof window === 'undefined') return fallback

  try {

    const raw = localStorage.getItem(key)

    return raw ? (JSON.parse(raw) as T) : fallback

  } catch {

    return fallback

  }

}



function writeStorage<T>(key: string, value: T) {

  localStorage.setItem(key, JSON.stringify(value))

}



export function usePets() {

  const [pets, setPets] = useState<Pet[]>([])

  const [appointments, setAppointments] = useState<Appointment[]>([])

  const [achievements, setAchievements] = useState<AchievementId[]>([])

  const [activePetId, setActivePetId] = useState<string | null>(null)

  const [loaded, setLoaded] = useState(false)



  useEffect(() => {

    const rawPets = readStorage<unknown[]>(PETS_KEY, [])

    const migrated = migratePets(rawPets)

    setPets(migrated)

    if (rawPets.length > 0) writeStorage(PETS_KEY, migrated)



    const rawAppointments = readStorage<Appointment[]>(APPOINTMENTS_KEY, [])

    setAppointments(

      rawAppointments.map((a) => ({

        ...a,

        petId: 'petId' in a ? (a as Appointment).petId : (a as { petIds?: string[] }).petIds?.[0] ?? '',

        groomingOptionIds:

          'groomingOptionIds' in a

            ? (a as Appointment).groomingOptionIds

            : (a as { groomingTypeId?: string }).groomingTypeId

              ? [(a as { groomingTypeId: string }).groomingTypeId]

              : [],

        scheduledDate: (a as Appointment).scheduledDate ?? '',

        scheduledTime: (a as Appointment).scheduledTime ?? '',

      }))

    )



    setAchievements(readStorage<AchievementId[]>(ACHIEVEMENTS_KEY, []))

    setActivePetId(readStorage<string | null>(ACTIVE_PET_KEY, null))

    setLoaded(true)

  }, [])



  const syncAchievements = useCallback((nextPets: Pet[], nextAppointments: Appointment[]) => {

    const nextAchievements = evaluateAchievements(nextPets, nextAppointments, [])

    setAchievements(nextAchievements)

    writeStorage(ACHIEVEMENTS_KEY, nextAchievements)

    return nextAchievements

  }, [])



  const setActivePet = useCallback((petId: string | null) => {

    setActivePetId(petId)

    writeStorage(ACTIVE_PET_KEY, petId)

  }, [])



  const registerPet = useCallback(

    (draft: PetRegistrationDraft) => {

      const breed = getBreedById(draft.breedId)

      if (!breed) throw new Error('Raça inválida')



      const xp = calculateNewPetXp()

      const pet: Pet = {

        id: crypto.randomUUID(),

        name: draft.name.trim(),

        breedId: draft.breedId,

        ageYears: draft.ageYears,

        ageMonths: draft.ageYears === 0 ? draft.ageMonths : undefined,

        ageRecordedAt: new Date().toISOString(),

        weightKg: draft.weightKg,

        sex: draft.sex,

        neutered: draft.neutered,

        bodyCondition: draft.bodyCondition,

        coatType: draft.breedId === 'b1' ? draft.coatType : undefined,

        health: draft.health,

        preferences: draft.preferences,

        profileCompleted: isDraftComplete(draft),

        firstAppointmentBooked: false,

        firstBathCompleted: false,

        xp,

        level: calculateLevel(xp),

        createdAt: new Date().toISOString(),

      }



      const nextPets = [...pets, pet]

      setPets(nextPets)

      writeStorage(PETS_KEY, nextPets)

      setActivePet(pet.id)

      const nextAchievements = syncAchievements(nextPets, appointments)



      return { pet, xp, newAchievements: nextAchievements.filter((a) => !achievements.includes(a)) }

    },

    [appointments, achievements, pets, setActivePet, syncAchievements]

  )



  const updatePet = useCallback(

    (petId: string, draft: PetRegistrationDraft) => {

      const existing = pets.find((p) => p.id === petId)

      if (!existing) throw new Error('Pet não encontrado')



      const ageChanged = hasAgeChanged(existing, draft)



      const updated: Pet = {

        ...existing,

        name: draft.name.trim(),

        breedId: draft.breedId,

        ageYears: draft.ageYears,

        ageMonths: draft.ageYears === 0 ? draft.ageMonths : undefined,

        ageRecordedAt: ageChanged ? new Date().toISOString() : existing.ageRecordedAt,

        weightKg: draft.weightKg,

        sex: draft.sex,

        neutered: draft.neutered,

        bodyCondition: draft.bodyCondition,

        coatType: draft.breedId === 'b1' ? draft.coatType : undefined,

        health: draft.health,

        preferences: draft.preferences,

        profileCompleted: isDraftComplete(draft),

      }



      const nextPets = pets.map((p) => (p.id === petId ? updated : p))

      setPets(nextPets)

      writeStorage(PETS_KEY, nextPets)

      setActivePet(updated.id)

      syncAchievements(nextPets, appointments)



      return updated

    },

    [appointments, pets, setActivePet, syncAchievements]

  )



  const getPetById = useCallback(

    (petId: string) => pets.find((p) => p.id === petId),

    [pets]

  )



  const createAppointment = useCallback(

    (input: {

      petId: string

      bathTypeId: string

      groomingOptionIds: string[]

      scheduledDate: string

      scheduledTime: string

      totalPrice: number

    }) => {

      const xpEarned = calculateAppointmentXp()

      const appointment: Appointment = {

        id: crypto.randomUUID(),

        petId: input.petId,

        bathTypeId: input.bathTypeId,

        groomingOptionIds: input.groomingOptionIds,

        scheduledDate: input.scheduledDate,

        scheduledTime: input.scheduledTime,

        totalPrice: input.totalPrice,

        xpEarned,

        createdAt: new Date().toISOString(),

      }



      const nextPets = pets.map((pet) => {

        if (pet.id !== input.petId) return pet

        const newXp = pet.xp + xpEarned

        return {

          ...pet,

          xp: newXp,

          level: calculateLevel(newXp),

          firstAppointmentBooked: true,

        }

      })



      const nextAppointments = [...appointments, appointment]

      setPets(nextPets)

      setAppointments(nextAppointments)

      writeStorage(PETS_KEY, nextPets)

      writeStorage(APPOINTMENTS_KEY, nextAppointments)

      const nextAchievements = syncAchievements(nextPets, nextAppointments)



      return {

        appointment,

        xpEarned,

        newAchievements: nextAchievements.filter((a) => !achievements.includes(a)),

      }

    },

    [achievements, appointments, pets, syncAchievements]

  )



  const awardPurchaseXp = useCallback(

    (petId?: string) => {

      const targetId = petId ?? activePetId ?? pets[0]?.id

      if (!targetId) return 0



      const xpEarned = calculatePurchaseXp()

      const nextPets = pets.map((pet) => {

        if (pet.id !== targetId) return pet

        const newXp = pet.xp + xpEarned

        return { ...pet, xp: newXp, level: calculateLevel(newXp) }

      })



      setPets(nextPets)

      writeStorage(PETS_KEY, nextPets)

      return xpEarned

    },

    [activePetId, pets]

  )



  const activePet = pets.find((p) => p.id === activePetId) ?? pets[0] ?? null



  return {

    pets,

    appointments,

    achievements,

    activePet,

    activePetId,

    loaded,

    registerPet,

    updatePet,

    getPetById,

    createAppointment,

    awardPurchaseXp,

    setActivePet,

    getPetAgeMonths: (pet: Pet) => getCurrentAgeMonths(pet),

  }

}


