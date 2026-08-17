import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/data/products'
import { ProductDetail } from '@/components/catalogo/ProductDetail'

interface ProductPageProps {
  params: { id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
