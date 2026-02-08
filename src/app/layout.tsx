import type { Metadata } from 'next'
import '../styles/globals.css'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Sistema GCVF - FIERGS',
  description: 'Sistema de Gestão de Ciclo de Vida do Funcionário',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}