'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { PawPrint, ShoppingBag, ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/hooks/useCart'
import { cn } from '@/lib/utils'
import { PetSwitcher } from '@/components/layout/PetSwitcher'

const navItems = [
  { href: '/catalogo', label: 'Catálogo', icon: ShoppingBag },
  { href: '/banho-tosa', label: 'Meu pet', icon: PawPrint },
]

export function AppHeader() {
  const pathname = usePathname()
  const { itemCount, loaded: cartLoaded } = useCart()

  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <Image
            src="/brand/rincao-pet-icon.png"
            alt="RincãoPet"
            width={987}
            height={752}
            className="h-11 w-auto shrink-0 bg-transparent object-contain md:hidden"
          />
          <Image
            src="/brand/rincao-pet-logo.png"
            alt="RincãoPet"
            width={894}
            height={994}
            className="hidden h-14 w-auto bg-transparent object-contain md:block"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 rounded-chip border px-3 py-2 text-sm font-heading font-semibold transition-colors',
                  isActive
                    ? 'border-secondary bg-secondary text-white hover:bg-secondary-dark active:bg-secondary-light'
                    : 'border-transparent bg-transparent text-secondary hover:bg-secondary/10 active:bg-secondary/20'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <PetSwitcher compact />
          <Link
            href="/carrinho"
            className={cn(
              'relative flex h-10 w-10 items-center justify-center rounded-chip border transition-colors',
              pathname.startsWith('/carrinho')
                ? 'border-secondary bg-secondary/15 text-secondary'
                : 'border-border text-muted hover:border-secondary/30 hover:text-secondary'
            )}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartLoaded && itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="flex px-2 py-1.5 md:hidden">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1.5 rounded-chip border py-2 text-xs font-heading font-semibold transition-colors',
                  isActive
                    ? 'border-secondary bg-secondary text-white hover:bg-secondary-dark active:bg-secondary-light'
                    : 'border-transparent bg-transparent text-secondary hover:bg-secondary/10 active:bg-secondary/20'
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
