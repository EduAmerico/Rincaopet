'use client'

import { ProductDetail } from '@/components/catalogo/ProductDetail'
import { useProducts } from '@/lib/hooks/useProducts'
import { isProductActive } from '@/lib/catalog/productRepository'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface ProductPageProps {
  params: { id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { getById, loaded } = useProducts()

  if (!loaded) {
    return <p className="text-muted">Carregando produto...</p>
  }

  const product = getById(params.id)
  if (!product || !isProductActive(product)) {
    return (
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-heading text-2xl font-bold text-ink">Produto não encontrado</h1>
        <p className="mt-2 text-sm text-muted">
          Esse item pode ter sido removido ou está indisponível.
        </p>
        <Link href="/catalogo" className="mt-6 inline-block">
          <Button variant="secondary">Voltar ao catálogo</Button>
        </Link>
      </div>
    )
  }

  return <ProductDetail product={product} />
}
