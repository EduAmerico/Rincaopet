import Link from 'next/link'
import { Droplets, ShoppingBag, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 px-6 py-12 text-white shadow-lg md:px-10">
        <div className="max-w-2xl">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-green-100">
            <Sparkles className="h-4 w-4" />
            Bem-vindo à Agropet Goldpet
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Catálogo completo e banho & tosa para seu pet
          </h1>
          <p className="mt-4 text-lg text-green-50">
            Explore produtos por marca, cadastre seus pets e agende banho e tosa com
            perfil de saúde para a equipe.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-pet-green">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Catálogo</h2>
          <p className="mt-2 flex-1 text-gray-600">
            Filtre por marca, categoria e preço. Encontre ração, brinquedos, higiene e
            acessórios para seu pet.
          </p>
          <Link href="/catalogo" className="mt-6">
            <Button className="w-full">Ver catálogo</Button>
          </Link>
        </Card>

        <Card className="flex flex-col">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-pet-orange">
            <Droplets className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Banho e Tosa</h2>
          <p className="mt-2 flex-1 text-gray-600">
            Cadastre pets com gamificação de raças, ganhe XP e agende banho e tosa para
            um ou mais cachorros cadastrados.
          </p>
          <Link href="/banho-tosa" className="mt-6">
            <Button variant="secondary" className="w-full">
              Ir para Banho e Tosa
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  )
}
