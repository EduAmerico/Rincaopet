'use client'

import { Suspense } from 'react'
import { CatalogoContent } from './CatalogoContent'

export default function CatalogoPage() {
  return (
    <Suspense fallback={<p className="text-muted">Carregando catálogo...</p>}>
      <CatalogoContent />
    </Suspense>
  )
}
