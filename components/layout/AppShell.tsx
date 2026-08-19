'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AppHeader } from '@/components/layout/AppHeader'
import { SplashScreen } from '@/components/layout/SplashScreen'
import { TutorNameModal } from '@/components/layout/TutorNameModal'
import { useTutor } from '@/lib/hooks/useTutor'

type SplashPhase = 'splash' | 'fading' | 'done'

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  const { name, setName, loaded: tutorLoaded } = useTutor()
  const [phase, setPhase] = useState<SplashPhase>('splash')
  const [askName, setAskName] = useState(false)

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setPhase('fading'), 1200)
    const doneTimer = window.setTimeout(() => setPhase('done'), 1650)
    return () => {
      window.clearTimeout(fadeTimer)
      window.clearTimeout(doneTimer)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'done' || !tutorLoaded || name) {
      setAskName(false)
      return
    }
    const timer = window.setTimeout(() => setAskName(true), 180)
    return () => window.clearTimeout(timer)
  }, [phase, tutorLoaded, name])

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      {phase !== 'done' && <SplashScreen fading={phase === 'fading'} />}
      <div className={phase === 'splash' ? 'opacity-0' : undefined}>
        <AppHeader />
        <main className="mx-auto min-h-[calc(100vh-64px)] max-w-6xl px-4 py-6 md:py-8">
          {children}
        </main>
      </div>
      {askName && <TutorNameModal onSubmit={setName} />}
    </>
  )
}
