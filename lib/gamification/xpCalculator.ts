export const XP_NEW_PET = 10
export const XP_APPOINTMENT = 20
export const XP_PURCHASE = 30

export function calculateLevel(xp: number) {
  return Math.floor(xp / 100) + 1
}

export function xpForNextLevel(xp: number) {
  const currentLevel = calculateLevel(xp)
  return currentLevel * 100
}

export function xpProgressInLevel(xp: number) {
  const levelStart = (calculateLevel(xp) - 1) * 100
  const progress = xp - levelStart
  return Math.min(100, Math.max(0, progress))
}

export function calculateNewPetXp() {
  return XP_NEW_PET
}

export function calculateAppointmentXp() {
  return XP_APPOINTMENT
}

export function calculatePurchaseXp() {
  return XP_PURCHASE
}

export function calculateTotalTutorXp(pets: { xp: number }[]) {
  return pets.reduce((sum, pet) => sum + pet.xp, 0)
}

export function calculateTutorLevel(pets: { xp: number }[]) {
  return calculateLevel(calculateTotalTutorXp(pets))
}
