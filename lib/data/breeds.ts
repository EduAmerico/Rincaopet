import type { Breed } from '@/lib/types'

export const breeds: Breed[] = [
  { id: 'b1', name: 'SRD (Vira-lata)', image: '/images/breed-srd.svg' },
  { id: 'b2', name: 'Poodle', image: '/images/breed-poodle.svg' },
  { id: 'b3', name: 'Shih Tzu', image: '/images/breed-shih.svg' },
  { id: 'b4', name: 'Bulldog Francês', image: '/images/breed-bulldog.svg' },
  { id: 'b5', name: 'Labrador Retriever', image: '/images/breed-labrador.svg' },
  { id: 'b6', name: 'Golden Retriever', image: '/images/breed-golden.svg' },
  { id: 'b7', name: 'Pastor Alemão', image: '/images/breed-pastor.svg' },
  { id: 'b8', name: 'Husky Siberiano', image: '/images/breed-husky.svg' },
  { id: 'b9', name: 'Border Collie', image: '/images/breed-collie.svg' },
  { id: 'b10', name: 'Pit Bull / Am. Staffordshire', image: '/images/breed-rottweiler.svg' },
  { id: 'b11', name: 'Yorkshire Terrier', image: '/images/breed-shih.svg' },
  { id: 'b12', name: 'Chow Chow', image: '/images/breed-chow.svg' },
  { id: 'b13', name: 'Maltês', image: '/images/breed-shih.svg' },
  { id: 'b14', name: 'Lhasa Apso', image: '/images/breed-shih.svg' },
  { id: 'b15', name: 'Schnauzer', image: '/images/breed-pastor.svg' },
  { id: 'b16', name: 'Cocker Spaniel', image: '/images/breed-golden.svg' },
  { id: 'b17', name: 'Spitz / Lulu da Pomerânia', image: '/images/breed-poodle.svg' },
  { id: 'b18', name: 'Pug', image: '/images/breed-bulldog.svg' },
  { id: 'b19', name: 'Beagle', image: '/images/breed-labrador.svg' },
]

export function getBreedById(id: string) {
  return breeds.find((b) => b.id === id)
}
