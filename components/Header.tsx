'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { User, ChevronDown } from 'lucide-react'

const PAGE_TITLES: Record<string, string> = {
  '/feed': 'Feed',
  '/write': 'Write / New Entry',
  '/profile': 'Profile',
  '/settings': 'Settings',
  '/bookmarks': 'Bookmarks',
  '/my-stories': 'My Stories',
  '/drafts': 'Drafts',
  '/history': 'History',
}

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname()
  const [anonId, setAnonId] = useState<string | null>(null)
  const [souls, setSouls] = useState(134)

  useEffect(() => {
    setSouls(Math.floor(Math.random() * 80) + 90)
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles').select('anon_id').eq('id', user.id).single()
        if (data) setAnonId(data.anon_id)
      }
    }
    getUser()
  }, [])

  const title = PAGE_TITLES[pathname] ?? ''

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4"
      style={{
        background: 'rgba(13,13,20,0.90)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(45,45,66,0.5)',
      }}
    >
      {/* Left — Hamburger */}
      <button
        onClick={onMenuClick}
        className="flex items-center justify-center transition-all duration-200 flex-shrink-0"
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1px solid rgba(45,45,66,0.8)',
          color: '#94A3B8',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.color = '#fff'
          el.style.border = '1px solid rgba(124,58,237,0.5)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.color = '#94A3B8'
          el.style.border = '1px solid rgba(45,45,66,0.8)'
        }}
      >
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <rect width="15" height="1.5" rx="0.75" fill="currentColor"/>
          <rect y="4.75" width="15" height="1.5" rx="0.75" fill="currentColor"/>
          <rect y="9.5" width="15" height="1.5" rx="0.75" fill="currentColor"/>
        </svg>
      </button>

      {/* Center — Page title */}
      <div className="flex-1 text-center">
        {title && (
          <span className="text-[#94A3B8] text-sm tracking-wide">{title}</span>
        )}
      </div>

      {/* Right — Souls + Avatar */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Live souls counter */}
        <div className="hidden sm:flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-green"
          />
          <span className="text-[#94A3B8] text-xs">{souls} souls active</span>
        </div>

        <div
          className="hidden sm:block w-px h-4"
          style={{ background: 'rgba(45,45,66,0.8)' }}
        />

        {/* User avatar or sign in */}
        {anonId ? (
          <Link
            href="/profile"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: '28px',
                height: '28px',
                background: 'linear-gradient(135deg, rgba(124,58,237,0.5) 0%, rgba(26,26,46,1) 100%)',
                border: '1px solid rgba(45,45,66,0.8)',
              }}
            >
              <User size={13} color="#C4B5FD" />
            </div>
            <span className="text-[#C4B5FD] font-mono text-xs hidden sm:block">{anonId}</span>
            <ChevronDown size={12} color="#475569" />
          </Link>
        ) : (
          <Link
            href="/login"
            className="text-[#94A3B8] text-xs hover:text-white transition-colors"
            style={{
              padding: '6px 14px',
              borderRadius: '99px',
              border: '1px solid rgba(45,45,66,0.8)',
            }}
          >
            Sign in
          </Link>
        )}
      </div>
    </header>
  )
}