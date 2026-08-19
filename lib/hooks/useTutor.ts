'use client'

import { useCallback, useEffect, useState } from 'react'

const TUTOR_NAME_KEY = 'rincao_tutor_name'
const TUTOR_NAME_EVENT = 'rincao-tutor-updated'

export function useTutor() {
  const [name, setNameState] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(TUTOR_NAME_KEY)
      setNameState(stored)
    } catch {
      setNameState(null)
    }
    setLoaded(true)

    function onUpdated(event: Event) {
      const nextName = (event as CustomEvent<string>).detail
      setNameState(nextName)
    }

    window.addEventListener(TUTOR_NAME_EVENT, onUpdated)
    return () => window.removeEventListener(TUTOR_NAME_EVENT, onUpdated)
  }, [])

  const setName = useCallback((value: string) => {
    const trimmed = value.trim()
    if (!trimmed) return
    localStorage.setItem(TUTOR_NAME_KEY, trimmed)
    setNameState(trimmed)
    window.dispatchEvent(new CustomEvent(TUTOR_NAME_EVENT, { detail: trimmed }))
  }, [])

  return { name, setName, loaded }
}
