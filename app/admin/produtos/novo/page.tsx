'use client'

import { useRouter } from 'next/navigation'
import { ProductForm } from '@/components/admin/ProductForm'
import { useProducts } from '@/lib/hooks/useProducts'
import type { Product } from '@/lib/types'

export default function NewProductPage() {
  const router = useRouter()
  const { createProduct } = useProducts()

  function handleSubmit(product: Product) {
    createProduct(product)
    router.push('/admin/produtos')
  }

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl font-bold text-ink">Novo produto</h1>
      <ProductForm onSubmit={handleSubmit} onCancel={() => router.push('/admin/produtos')} />
    </div>
  )
}
