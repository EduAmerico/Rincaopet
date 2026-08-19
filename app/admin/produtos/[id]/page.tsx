'use client'

import { useRouter } from 'next/navigation'
import { ProductForm } from '@/components/admin/ProductForm'
import { useProducts } from '@/lib/hooks/useProducts'
import type { Product } from '@/lib/types'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

interface EditProductPageProps {
  params: { id: string }
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter()
  const { getById, updateProduct, loaded } = useProducts()

  if (!loaded) return <p className="text-muted">Carregando...</p>

  const product = getById(params.id)
  if (!product) {
    return (
      <div>
        <p className="text-muted">Produto não encontrado.</p>
        <Link href="/admin/produtos" className="mt-4 inline-block">
          <Button variant="outline">Voltar</Button>
        </Link>
      </div>
    )
  }

  function handleSubmit(next: Product) {
    updateProduct(params.id, next)
    router.push('/admin/produtos')
  }

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-ink">Editar produto</h1>
      <ProductForm
        product={product}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/admin/produtos')}
      />
    </div>
  )
}
