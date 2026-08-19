export type ProductCategory = 'racao' | 'brinquedo' | 'higiene' | 'acessorio'

export type PetSize = 'small' | 'medium' | 'large' | 'giant'
export type LifeStage = 'puppy' | 'adult' | 'senior'
export type EnergyProfile = 'light' | 'standard' | 'high-energy'

export type PetSex = 'male' | 'female'
export type BodyCondition = 'delicate' | 'thin' | 'normal' | 'overweight' | 'obese'
export type CoatType = 'short' | 'medium' | 'long' | 'curly' | 'double' | 'wire'

export type GroomingServiceType =
  | 'haircut'
  | 'sanitary'
  | 'outline-trim'
  | 'paw-trim'
  | 'deshedding'
  | 'coat-care'

export type BaseProduct = {
  id: string
  name: string
  brand: string
  category: ProductCategory
  image: string
  description?: string
  promoPercent?: number
  active?: boolean
  recommendedSizes?: PetSize[]
  recommendedLifeStages?: LifeStage[]
  forNeutered?: boolean
  energyProfile?: EnergyProfile
  breedIds?: string[]
  isTherapeutic?: boolean
}

export type UnitProduct = BaseProduct & {
  saleType: 'unit'
  price: number
}

export type WeightProduct = BaseProduct & {
  saleType: 'weight'
  pricePerKg: number
  minimumWeightGrams: number
  weightStepGrams: number
}

export type Product = UnitProduct | WeightProduct

export type Breed = {
  id: string
  name: string
  image: string
}

export type PetHealthInfo = import('@/lib/data/healthQuestions').PetHealthInfo

export type Pet = {
  id: string
  name: string
  breedId: string
  ageYears: number
  ageMonths?: number
  ageRecordedAt: string
  weightKg?: number
  sex?: PetSex
  neutered?: boolean
  bodyCondition?: BodyCondition
  coatType?: CoatType
  health?: PetHealthInfo
  preferences?: string[]
  profileCompleted: boolean
  firstAppointmentBooked: boolean
  firstBathCompleted: boolean
  coins: number
  createdAt: string
}

export type GroomingOption = {
  id: string
  name: string
  description: string
  serviceType: GroomingServiceType
  price: number
  recommended: boolean
  warning?: string
}

export type BreedGroomingProfile = {
  breedId: string
  coatType: string
  avoidShaving?: boolean
  shavingWarning?: string
  options: GroomingOption[]
}

export type GroomingMatchResult = {
  recommended: GroomingOption[]
  other: GroomingOption[]
  profile: BreedGroomingProfile
}

export type BathType = {
  id: string
  name: string
  description: string
  price: number
  durationMin: number
}

export type Appointment = {
  id: string
  petId: string
  bathTypeId: string
  groomingOptionIds: string[]
  scheduledDate: string
  scheduledTime: string
  totalPrice: number
  coinsEarned: number
  createdAt: string
}

export type FoodProfile = {
  lifeStage: LifeStage
  size: PetSize
  weightKg: number
  neutered: boolean
  bodyCondition: BodyCondition
}

export type ProductMatch = {
  product: Product
  score: number
  reasons: string[]
}

export type CartItem = {
  productId: string
  quantity: number
  unitPrice: number
}

export type Cart = {
  items: CartItem[]
  updatedAt: string
}

export type AchievementId =
  | 'primeiro_pet'
  | 'primeiro_banho'
  | 'primeiro_agendamento'
  | 'primeiro_pedido_whatsapp'
  | 'primeira_compra'
  | 'familia_pet'

export type Achievement = {
  id: AchievementId
  title: string
  description: string
  icon: string
}

export type CatalogFilters = {
  search: string
  brands: string[]
  categories: ProductCategory[]
  minPrice: number
  maxPrice: number
}

export type PetRegistrationDraft = {
  name: string
  breedId: string
  ageYears: number
  ageMonths?: number
  weightKg: number
  sex: PetSex
  neutered: boolean
  bodyCondition: BodyCondition
  coatType?: CoatType
  health: PetHealthInfo
  preferences: string[]
}

export const SRD_BREED_ID = 'b1'
