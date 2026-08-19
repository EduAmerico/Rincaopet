'use client'

import Link from 'next/link'
import { Droplets, ShoppingBag } from 'lucide-react'
import type { Pet } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function HomeHeroOnboarding({ tutorName }: { tutorName?: string | null }) {
  return (
    <section className="rounded-[16px] border border-border bg-surface p-6 md:p-10">
      <div className="max-w-xl">
        <p className="text-sm font-medium text-secondary">
          {tutorName ? `Olá, ${tutorName}` : 'Bem-vindo à RincãoPet'}
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-ink md:text-4xl">
          Cadastre seu pet para começar
        </h1>
        <p className="mt-3 text-base text-muted">
          Crie o perfil do seu cachorro ou explore o catálogo de produtos.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/banho-tosa/cadastro">
            <Button variant="secondary" className="w-full sm:w-auto">Cadastrar meu pet</Button>
          </Link>
          <Link href="/catalogo">
            <Button variant="outline" className="w-full sm:w-auto">
              Ver catálogo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

interface HomeHeroPersonalizedProps {
  tutorName: string | null
  pet: Pet
}

export function HomeHeroPersonalized({ tutorName, pet }: HomeHeroPersonalizedProps) {
  return (
    <section className="rounded-[16px] bg-secondary/15 p-6 md:p-8">
      <p className="font-heading text-2xl font-bold text-ink md:text-3xl">
        Olá{tutorName ? `, ${tutorName}` : ''}
      </p>
      <p className="mt-1 text-base text-muted md:text-lg">
        O que vamos fazer pelo <span className="font-semibold text-secondary">{pet.name}</span> hoje?
      </p>
    </section>
  )
}

interface QuickActionsProps {
  petName: string
  petId: string
}

export function QuickActions({ petName, petId }: QuickActionsProps) {
  const actions = [
    {
      href: `/catalogo?petId=${petId}`,
      label: `Produtos para ${petName}`,
      icon: ShoppingBag,
    },
    {
      href: '/banho-tosa/agendar',
      label: 'Banho e Tosa',
      icon: Droplets,
    },
    {
      href: '/catalogo',
      label: 'Catálogo completo',
      icon: ShoppingBag,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {actions.map((action) => (
        <Link key={action.href + action.label} href={action.href}>
          <Card className="flex h-full flex-col gap-3 transition hover:border-secondary/30 hover:shadow-elevated">
            <div className="flex h-10 w-10 items-center justify-center rounded-chip bg-secondary/15 text-secondary">
              <action.icon className="h-5 w-5" />
            </div>
            <p className="font-heading text-sm font-semibold text-ink">{action.label}</p>
          </Card>
        </Link>
      ))}
    </div>
  )
}
