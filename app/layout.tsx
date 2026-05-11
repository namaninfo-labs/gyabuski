import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'
import MobileNav from '@/components/MobileNav'
import ConditionalLayout from '@/components/ConditionalLayout'

export const metadata: Metadata = {
  title: {
    default: 'GYABUSKI',
    template: '%s – GYABUSKI',
  },
  description: 'Anonymous emotional archive. No names. No judgment. Only real feelings.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0D0D14] text-white">
        {/* Ambient Glow */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-250px] left-1/2 w-[700px] h-[700px] rounded-full bg-purple-900/10 blur-3xl" />
        </div>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}