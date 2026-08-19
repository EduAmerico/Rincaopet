'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface TutorNameModalProps {
  onSubmit: (name: string) => void
}

export function TutorNameModal({ onSubmit }: TutorNameModalProps) {
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 80)
    return () => {
      document.body.style.overflow = previous
      window.clearTimeout(focusTimer)
    }
  }, [])

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const trimmed = name.trim()
    if (trimmed.length < 2) return
    onSubmit(trimmed)
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-ink/25 backdrop-blur-[24px]" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="tutor-name-title"
        className="relative w-full max-w-[340px] animate-rincao-modal-in rounded-[28px] bg-white/80 p-6 shadow-[0_24px_80px_rgba(23,33,43,0.22)] ring-1 ring-white/70 backdrop-blur-xl"
      >
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-primary">
          RincãoPet
        </p>
        <h2
          id="tutor-name-title"
          className="mt-2 text-center font-heading text-2xl font-bold text-ink"
        >
          Como podemos te chamar?
        </h2>
        <p className="mt-2 text-center text-sm text-muted">
          Precisamos do seu nome para personalizar a experiência.
        </p>
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <Input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            autoComplete="given-name"
            maxLength={40}
            required
            minLength={2}
            className="rounded-2xl bg-white text-center text-base"
          />
          <Button type="submit" className="w-full rounded-2xl py-3" disabled={name.trim().length < 2}>
            Continuar
          </Button>
        </form>
      </div>
    </div>
  )
}
