export const COINS_NEW_PET = 10
export const COINS_APPOINTMENT = 20
export const COINS_PURCHASE = 30

export function calculateNewPetCoins() {
  return COINS_NEW_PET
}

export function calculateAppointmentCoins() {
  return COINS_APPOINTMENT
}

export function calculatePurchaseCoins() {
  return COINS_PURCHASE
}

export function calculateTotalTutorCoins(pets: { coins: number }[]) {
  return pets.reduce((sum, pet) => sum + pet.coins, 0)
}
