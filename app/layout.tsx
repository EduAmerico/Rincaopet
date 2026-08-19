import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import { AppShell } from '@/components/layout/AppShell'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RincãoPet — Catálogo & Banho e Tosa',
  description: 'Catálogo de produtos e agendamento de banho e tosa para pets.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${manrope.variable} ${inter.variable} font-body antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
