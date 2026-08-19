'use client'

import { useCallback, useEffect, useState } from 'react'
import { shopConfig } from '@/lib/config'

const SESSION_KEY = 'rincaopet_admin_session'

export function useAdminAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setAuthenticated(sessionStorage.getItem(SESSION_KEY) === '1')
    setLoaded(true)
  }, [])

  const login = useCallback((password: string) => {
    if (password.trim() !== shopConfig.adminPassword) return false
    sessionStorage.setItem(SESSION_KEY, '1')
    setAuthenticated(true)
    return true
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthenticated(false)
  }, [])

  return { authenticated, loaded, login, logout }
}
