'use client'

import { Navigation } from './Navigation'

interface AppLayoutProps {
  children: React.ReactNode
  title?: string
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] gap-8">
      <Navigation />
      <main className="container py-8">
        {title && <h1 className="mb-6 text-3xl font-bold">{title}</h1>}
        {children}
      </main>
      <footer className="border-t p-4 text-center text-sm text-muted-foreground">
        Simple navigation example
      </footer>
    </div>
  )
}
