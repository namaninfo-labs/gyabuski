import type { Metadata } from 'next'
import './globals.css'
import LayoutShell from '@/components/LayoutShell'

export const metadata: Metadata = {
  title: 'GYABUSKI — anonymous emotional archive',
  description: 'Some things are easier to write than to say. No names. No judgment. Only real feelings.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0D0D14] text-white antialiased">
        <LayoutShell>
          {children}
        </LayoutShell>
      </body>
    </html>
  )
}