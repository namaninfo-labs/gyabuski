'use client'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import {
  Home, BookOpen, Pen, Bookmark, FileText,
  User, Settings, Clock, LogOut, X,
  CloudRain, Moon, Wind, Flame, Heart,
  HelpCircle, Leaf, Frown, Smile, MessageCircle,
  Filter,
} from 'lucide-react'

const MOODS = [
  { label: 'All',        Icon: Filter },
  { label: 'Sad',        Icon: Frown },
  { label: 'Lonely',     Icon: Moon },
  { label: 'Anxious',    Icon: Wind },
  { label: 'Hopeful',    Icon: Smile },
  { label: 'Angry',      Icon: Flame },
  { label: 'Confession', Icon: MessageCircle },
  { label: 'Grateful',   Icon: Heart },
  { label: 'Confused',   Icon: HelpCircle },
  { label: 'Tired',      Icon: CloudRain },
  { label: 'Calm',       Icon: Leaf },
]

/* ── shared logout button ── */
function DrawerLogout() {
  const router = useRouter()
  async function logout() {
    await supabase.auth.signOut()
    router.push('/')
  }
  return (
    <div style={{ borderTop: '1px solid rgba(45,45,66,0.7)', padding: '16px 20px' }}>
      <button
        onClick={logout}
        className="flex items-center gap-3 text-[#475569] hover:text-red-400 transition-colors text-sm"
      >
        <LogOut size={14} />
        Logout
      </button>
    </div>
  )
}

/* ── Feed drawer — mood filter ── */
function FeedDrawerContent() {
  const router = useRouter()
  function filterByMood(mood: string) {
    if (mood === 'All') router.push('/feed')
    else router.push(`/feed?mood=${mood}`)
  }
  return (
    <div className="flex flex-col h-full">
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(45,45,66,0.7)' }}>
        <p
          className="text-[#475569] uppercase"
          style={{ fontSize: '9px', letterSpacing: '0.28em', fontWeight: 500 }}
        >
          Filter by mood
        </p>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {MOODS.map(({ label, Icon }) => (
          <button
            key={label}
            onClick={() => filterByMood(label)}
            className="w-full flex items-center gap-3 text-left transition-colors hover:bg-[#13131E] text-[#E2E8F0] text-sm"
            style={{ padding: '11px 20px' }}
          >
            <Icon size={15} color="#475569" strokeWidth={1.5} />
            {label}
          </button>
        ))}
      </div>
      <DrawerLogout />
    </div>
  )
}

/* ── Write drawer — gentle reminders ── */
function WriteDrawerContent() {
  const reminders = [
    { Icon: Pen,          title: 'Write freely',      sub: 'There are no rules here.' },
    { Icon: Heart,        title: 'You are not alone', sub: 'Many feel what you feel.' },
    { Icon: Bookmark,     title: "It's safe here",    sub: 'No names. No judgment.' },
    { Icon: MessageCircle,title: 'Be honest',         sub: 'Honesty is connection.' },
  ]
  return (
    <div className="flex flex-col h-full">
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(45,45,66,0.7)' }}>
        <p className="text-[#C4B5FD] text-sm font-medium">Writing is healing.</p>
        <p className="text-[#475569] text-xs mt-0.5">A few gentle reminders</p>
      </div>
      <div className="flex-1 py-4 px-5 space-y-5">
        {reminders.map(({ Icon, title, sub }) => (
          <div key={title} className="flex gap-3">
            <Icon size={15} color="#7C3AED" strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-[#E2E8F0] text-sm">{title}</p>
              <p className="text-[#475569] text-xs mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(45,45,66,0.7)', paddingTop: '16px' }}>
          <Link
            href="/drafts"
            className="flex items-center gap-2.5 text-[#94A3B8] text-sm hover:text-white transition-colors"
          >
            <FileText size={14} color="#475569" /> My Drafts
          </Link>
        </div>
      </div>
      <DrawerLogout />
    </div>
  )
}

/* ── Default / Home drawer — full nav ── */
function HomeDrawerContent() {
  const navItems = [
    { href: '/',           Icon: Home,     label: 'Home' },
    { href: '/feed',       Icon: BookOpen, label: 'Feed' },
    { href: '/write',      Icon: Pen,      label: 'Write' },
    { href: '/bookmarks',  Icon: Bookmark, label: 'Bookmarks' },
    { href: '/my-stories', Icon: FileText, label: 'My Stories' },
    { href: '/drafts',     Icon: FileText, label: 'Drafts' },
    { href: '/history',    Icon: Clock,    label: 'History' },
    { href: '/profile',    Icon: User,     label: 'Profile' },
    { href: '/settings',   Icon: Settings, label: 'Settings' },
  ]
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 py-2">
        {navItems.map(({ href, Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 text-[#94A3B8] hover:text-white hover:bg-[#13131E] transition-all text-sm"
            style={{ padding: '12px 20px' }}
          >
            <Icon size={15} strokeWidth={1.5} className="flex-shrink-0" />
            {label}
          </Link>
        ))}
      </div>
      <DrawerLogout />
    </div>
  )
}

/* ══ MAIN DRAWER COMPONENT ══ */
export default function Drawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const pathname = usePathname()

  // Close on route change
  useEffect(() => { onClose() }, [pathname])

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  function getContent() {
    if (pathname.startsWith('/feed') || pathname.startsWith('/post'))
      return <FeedDrawerContent />
    if (pathname.startsWith('/write'))
      return <WriteDrawerContent />
    return <HomeDrawerContent />
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 transition-opacity duration-300"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        />
      )}

      {/* Drawer panel */}
      <div
        className="fixed top-0 left-0 h-full z-50 transition-transform duration-300 ease-out"
        style={{
          width: '288px',
          background: '#0D0D14',
          borderRight: '1px solid rgba(45,45,66,0.7)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        {/* Drawer header */}
        <div
          className="h-14 flex items-center justify-between px-5"
          style={{ borderBottom: '1px solid rgba(45,45,66,0.7)' }}
        >
          <div>
            <p
              className="text-white font-bold tracking-[0.25em]"
              style={{ fontSize: '13px', fontFamily: 'Inter, sans-serif' }}
            >
              GYABUSKI
            </p>
            <p
              className="text-[#C4B5FD] uppercase"
              style={{ fontSize: '8px', letterSpacing: '0.2em', fontWeight: 300 }}
            >
              anonymous emotional archive
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center text-[#475569] hover:text-white transition-colors"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: '1px solid rgba(45,45,66,0.7)',
            }}
          >
            <X size={13} />
          </button>
        </div>

        {/* Context-aware content */}
        {getContent()}
      </div>
    </>
  )
}