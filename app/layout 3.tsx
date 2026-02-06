import type { Metadata } from 'next'
import { Inter, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import './styles.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({ 
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CaseFin - Disciplined Litigation Finance',
  description: 'Permissioned infrastructure for litigation funding. Structured submission, staged review, and controlled access.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
