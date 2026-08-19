'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, Package, Store } from 'lucide-react'
import { useAdminAuth } from '@/lib/hooks/useAdminAuth'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { FormEvent, useState } from 'react'

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { authenticated, loaded, login, logout } = useAdminAuth()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const pathname = usePathname()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!login(password)) {
      setError('Senha incorreta.')
      return
    }
    setError('')
  }

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-muted">
        Carregando...
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Card className="w-full max-w-sm">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-secondary">
            RincãoPet
          </p>
          <h1 className="mt-2 text-center font-heading text-2xl font-bold text-ink">
            Área administrativa
          </h1>
          <p className="mt-2 text-center text-sm text-muted">
            Entre para cadastrar e editar produtos.
          </p>
          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              autoComplete="current-password"
            />
            {error && <p className="text-sm text-secondary">{error}</p>}
            <Button type="submit" variant="secondary" className="w-full">
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
              Admin
            </p>
            <p className="font-heading text-lg font-bold text-ink">RincãoPet</p>
          </div>
          <nav className="flex items-center gap-1">
            <Link
              href="/admin/produtos"
              className={cn(
                'flex items-center gap-2 rounded-chip px-3 py-2 text-sm font-heading font-semibold',
                pathname.startsWith('/admin/produtos') || pathname === '/admin'
                  ? 'bg-secondary/15 text-secondary'
                  : 'text-muted hover:text-ink'
              )}
            >
              <Package className="h-4 w-4" />
              Produtos
            </Link>
            <Link
              href="/catalogo"
              className="flex items-center gap-2 rounded-chip px-3 py-2 text-sm font-heading font-semibold text-muted hover:text-ink"
            >
              <Store className="h-4 w-4" />
              Ver loja
            </Link>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">{children}</main>
    </div>
  )
}
