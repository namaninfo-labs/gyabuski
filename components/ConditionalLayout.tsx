'use client'

import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

// Pages jahan sidebar NAHI chahiye
const NO_SIDEBAR_ROUTES = ['/', '/login', '/register', '/onboarding']

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const showSidebar = !NO_SIDEBAR_ROUTES.includes(pathname)

  if (!showSidebar) {
    // Home, login, register - full screen, no sidebar
    return <>{children}</>
  }

  // App pages - sidebar + main content
  return (
    <div className="relative flex min-h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-[220px] min-h-screen pb-16 md:pb-0">
        {children}
      </main>
      <MobileNav />
    </div>
  )
}