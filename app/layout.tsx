import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { MainNav } from '@/components/layout/MainNav'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Agropet Goldpet — Catálogo & Banho e Tosa',
  description: 'Catálogo de produtos e agendamento de banho e tosa para pets.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} antialiased`}>
        <MainNav />
        <main className="mx-auto min-h-[calc(100vh-80px)] max-w-6xl px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
