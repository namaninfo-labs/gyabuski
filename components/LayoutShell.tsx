'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Header from './Header'
import Drawer from './Drawer'

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()

  const STANDALONE = ['/', '/login', '/register', '/onboarding', '/home']
  const isStandalone = STANDALONE.includes(pathname)

  if (isStandalone) {
    return <>{children}</>
  }

  return (
    <>
      <Header onMenuClick={() => setDrawerOpen(true)} />
      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <main className="pt-14">
        {children}
      </main>
    </>
  )
}