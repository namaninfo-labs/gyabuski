'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, Pen, User } from 'lucide-react'

export default function MobileNav() {
  const pathname = usePathname()
  const items = [
    { href:'/', icon:Home, label:'Home' },
    { href:'/feed', icon:BookOpen, label:'Read' },
    { href:'/write', icon:Pen, label:'Write' },
    { href:'/login', icon:User, label:'You' },
  ]
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#181825]/95 backdrop-blur-sm border-t border-[#2D2D42] z-50 px-4 py-2 safe-area-pb">
      <div className="flex items-center justify-around">
        {items.map(({ href, icon:Icon, label }) => (
          <Link key={href} href={href}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
              pathname === href
                ? 'text-[#C4B5FD] bg-[#7C3AED]/15'
                : 'text-[#475569] hover:text-[#94A3B8]'
            }`}
          >
            <Icon size={20} />
            <span className="text-[9px] tracking-wide">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}