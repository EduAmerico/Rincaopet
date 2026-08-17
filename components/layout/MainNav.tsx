'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dog, Droplets, ShoppingBag, ShoppingCart, Sparkles } from 'lucide-react'
import { usePets } from '@/lib/hooks/usePets'
import { useCart } from '@/lib/hooks/useCart'
import { calculateTotalTutorXp, calculateTutorLevel } from '@/lib/gamification/xpCalculator'
import { cn } from '@/lib/utils'
import { XpBar } from '@/components/banho-tosa/gamification/XpBar'

const navItems = [
  { href: '/catalogo', label: 'Catálogo', icon: ShoppingBag },
  { href: '/banho-tosa', label: 'Banho e Tosa', icon: Droplets },
]

export function MainNav() {
  const pathname = usePathname()
  const { pets, loaded: petsLoaded } = usePets()
  const { itemCount, loaded: cartLoaded } = useCart()

  const tutorXp = petsLoaded ? calculateTotalTutorXp(pets) : 0
  const tutorLevel = petsLoaded ? calculateTutorLevel(pets) : 1

  return (
    <header className="sticky top-0 z-50 border-b border-green-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pet-green text-white">
            <Dog className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">Agropet Goldpet</p>
            <p className="text-xs text-gray-500">Catálogo & Banho e Tosa</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors',
                  isActive
                    ? 'bg-pet-green text-white'
                    : 'text-gray-600 hover:bg-green-50 hover:text-pet-green'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          {petsLoaded && pets.length > 0 && (
            <div className="hidden w-40 lg:block">
              <div className="mb-1 flex items-center justify-between text-xs font-medium text-gray-600">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-pet-orange" />
                  Tutor Nv. {tutorLevel}
                </span>
                <span>{tutorXp} XP</span>
              </div>
              <XpBar xp={tutorXp} compact />
            </div>
          )}

          <Link
            href="/carrinho"
            className={cn(
              'relative flex h-10 w-10 items-center justify-center rounded-xl border transition-colors',
              pathname.startsWith('/carrinho')
                ? 'border-pet-green bg-green-50 text-pet-green'
                : 'border-gray-200 text-gray-600 hover:border-pet-green hover:text-pet-green'
            )}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartLoaded && itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-pet-orange px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="flex border-t border-green-50 px-4 py-2 md:hidden">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-semibold',
                isActive ? 'bg-pet-green text-white' : 'text-gray-600'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
