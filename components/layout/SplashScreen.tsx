'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface SplashScreenProps {
  fading?: boolean
}

export function SplashScreen({ fading = false }: SplashScreenProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-background',
        fading ? 'animate-rincao-fade-out' : ''
      )}
      aria-hidden
    >
      <Image
        src="/brand/rincao-pet-logo.png"
        alt="RincãoPet"
        width={894}
        height={994}
        priority
        className="h-auto w-48 animate-rincao-splash-logo object-contain sm:w-56"
      />
    </div>
  )
}
