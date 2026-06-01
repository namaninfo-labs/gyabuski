'use client'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import {
  Home, BookOpen, Pen, Bookmark, User,
  FileText, Clock, Settings, LogOut,
  TrendingUp, Heart, List, X,
  Frown, Moon, Wind, Flame, Smile,
  MessageCircle, HelpCircle, Leaf, CloudRain,
  Filter, BookMarked,
} from 'lucide-react'

const MOODS = [
  { label: 'All', Icon: Filter },
  { label: 'Sad', Icon: Frown },
  { label: 'Lonely', Icon: Moon },
  { label: 'Anxious', Icon: Wind },
  { label: 'Hopeful', Icon: Smile },
  { label: 'Angry', Icon: Flame },
  { label: 'Confession', Icon: MessageCircle },
  { label: 'Grateful', Icon: Heart },
  { label: 'Confused', Icon: HelpCircle },
  { label: 'Tired', Icon: CloudRain },
  { label: 'Calm', Icon: Leaf },
]

function LogoutButton() {
  const router = useRouter()
  async function logout() {
    await supabase.auth.signOut()
    router.push('/')
  }
  return (
    <button
      onClick={logout}
      className="w-full flex items-center gap-3 px-5 py-3 transition-colors text-left"
      style={{ color: '#475569' }}
      onMouseEnter={e => (e.currentTarget.style.color = '#ef4444')}
      onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
    >
      <LogOut size={16} />
      <span className="text-sm">Logout</span>
    </button>
  )
}

function NavLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-5 py-3 transition-all text-sm"
      style={{ color: '#94A3B8' }}
      onMouseEnter={e => {
        e.currentTarget.style.color = '#fff'
        e.currentTarget.style.background = 'rgba(124,58,237,0.08)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = '#94A3B8'
        e.currentTarget.style.background = 'transparent'
      }}
    >
      <Icon size={16} />
      <span>{label}</span>
    </Link>
  )
}

function SectionLabel({ label }: { label: string }) {
  return (
    <p className="text-[10px] tracking-widest uppercase px-5 pt-4 pb-2" style={{ color: '#475569' }}>
      {label}
    </p>
  )
}

// ── HOME drawer ──
function HomeDrawer() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto py-2">
        <SectionLabel label="Navigate" />
        <NavLink href="/home" icon={Home} label="Home" />
        <NavLink href="/feed" icon={BookOpen} label="Feed" />
        <NavLink href="/write" icon={Pen} label="Write" />
        <NavLink href="/bookmarks" icon={Bookmark} label="Bookmarks" />
        <NavLink href="/my-stories" icon={FileText} label="My Stories" />
        <NavLink href="/drafts" icon={Clock} label="Drafts" />
        <NavLink href="/profile" icon={User} label="Profile" />
        <NavLink href="/settings" icon={Settings} label="Settings" />
      </div>
      <div className="border-t" style={{ borderColor: '#2D2D42' }}>
        <LogoutButton />
      </div>
    </div>
  )
}

// ── FEED drawer ──
function FeedDrawer() {
  const router = useRouter()

  const sorts = [
    { label: 'Latest', Icon: List, param: null },
    { label: 'Trending', Icon: TrendingUp, param: 'trending' },
    { label: 'Most Liked', Icon: Heart, param: 'liked' },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Sort */}
      <div className="px-5 pt-4 pb-3 border-b" style={{ borderColor: '#2D2D42' }}>
        <p className="text-[10px] tracking-widest uppercase mb-3" style={{ color: '#475569' }}>Sort by</p>
        <div className="flex flex-col gap-1">
          {sorts.map(({ label, Icon, param }) => (
            <button
              key={label}
              onClick={() => router.push(param ? `/feed?sort=${param}` : '/feed')}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left text-sm"
              style={{ color: '#94A3B8' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#C4B5FD'
                e.currentTarget.style.background = 'rgba(124,58,237,0.10)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#94A3B8'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <Icon size={15} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mood filter */}
      <div className="flex-1 overflow-y-auto px-5 py-3">
        <p className="text-[10px] tracking-widest uppercase mb-3" style={{ color: '#475569' }}>Filter by mood</p>
        <div className="flex flex-col gap-0.5">
          {MOODS.map(({ label, Icon }) => (
            <button
              key={label}
              onClick={() => router.push(label === 'All' ? '/feed' : `/feed?mood=${label}`)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left w-full text-sm"
              style={{ color: '#94A3B8' }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#fff'
                e.currentTarget.style.background = 'rgba(124,58,237,0.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = '#94A3B8'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <Icon size={15} strokeWidth={1.5} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t" style={{ borderColor: '#2D2D42' }}>
        <LogoutButton />
      </div>
    </div>
  )
}

// ── WRITE drawer ──
function WriteDrawer() {
  const reminders = [
    { Icon: Pen, title: 'Write freely', sub: 'There are no rules here.' },
    { Icon: Heart, title: 'You are not alone', sub: 'Many feel what you feel.' },
    { Icon: Bookmark, title: "It's safe here", sub: 'No names. No judgment.' },
    { Icon: MessageCircle, title: 'Be honest', sub: 'Honesty is connection.' },
  ]
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b" style={{ borderColor: '#2D2D42' }}>
        <p style={{ color: '#C4B5FD', fontWeight: 500, fontSize: '14px' }}>Writing is healing.</p>
        <p className="text-xs mt-0.5" style={{ color: '#475569' }}>A few gentle reminders</p>
      </div>
      <div className="flex-1 px-5 py-4 overflow-y-auto">
        {reminders.map(({ Icon, title, sub }) => (
          <div key={title} className="flex gap-3 mb-5">
            <Icon size={15} color="#7C3AED" strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm" style={{ color: '#E2E8F0' }}>{title}</p>
              <p className="text-xs mt-0.5" style={{ color: '#475569' }}>{sub}</p>
            </div>
          </div>
        ))}
        <div className="border-t pt-4 mt-2" style={{ borderColor: '#2D2D42' }}>
          <p className="text-[10px] tracking-widest uppercase mb-3" style={{ color: '#475569' }}>Quick access</p>
          <NavLink href="/drafts" icon={FileText} label="My Drafts" />
          <NavLink href="/my-stories" icon={BookMarked} label="My Stories" />
        </div>
      </div>
      <div className="border-t" style={{ borderColor: '#2D2D42' }}>
        <LogoutButton />
      </div>
    </div>
  )
}

// ── PROFILE drawer ──
function ProfileDrawer() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto py-2">
        <SectionLabel label="Your Space" />
        <NavLink href="/profile" icon={User} label="My Profile" />
        <NavLink href="/my-stories" icon={FileText} label="My Stories" />
        <NavLink href="/bookmarks" icon={Bookmark} label="Bookmarks" />
        <NavLink href="/drafts" icon={Clock} label="Drafts" />
        <div className="border-t mt-2" style={{ borderColor: '#2D2D42' }}>
          <SectionLabel label="Settings" />
          <NavLink href="/settings" icon={Settings} label="Settings" />
        </div>
      </div>
      <div className="border-t" style={{ borderColor: '#2D2D42' }}>
        <LogoutButton />
      </div>
    </div>
  )
}

// ── DEFAULT drawer ──
function DefaultDrawer() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 py-2">
        <SectionLabel label="Navigate" />
        <NavLink href="/feed" icon={BookOpen} label="Back to Feed" />
        <NavLink href="/write" icon={Pen} label="Write something" />
        <NavLink href="/profile" icon={User} label="My Profile" />
      </div>
      <div className="border-t" style={{ borderColor: '#2D2D42' }}>
        <LogoutButton />
      </div>
    </div>
  )
}

// ── MAIN DRAWER ──
export default function Drawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname()

  useEffect(() => { onClose() }, [pathname])

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  function getTitle() {
    if (pathname === '/home') return 'Menu'
    if (pathname.startsWith('/feed')) return 'Explore'
    if (pathname.startsWith('/write')) return 'Write'
    if (pathname.startsWith('/profile')) return 'Your Space'
    return 'Navigate'
  }

  function getContent() {
    if (pathname === '/home') return <HomeDrawer />
    if (pathname.startsWith('/feed') || pathname.startsWith('/post')) return <FeedDrawer />
    if (pathname.startsWith('/write')) return <WriteDrawer />
    if (pathname.startsWith('/profile')) return <ProfileDrawer />
    return <DefaultDrawer />
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ background: 'rgba(0,0,0,0.60)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        />
      )}

      <div
        className="fixed top-0 left-0 h-full z-50 flex flex-col"
        style={{
          width: '280px',
          background: '#0D0D14',
          borderRight: '1px solid #2D2D42',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.28s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      >
        {/* Header */}
        <div
          className="h-14 flex items-center justify-between px-5 flex-shrink-0"
          style={{ borderBottom: '1px solid #2D2D42' }}
        >
          <div>
            <p className="font-bold text-sm tracking-widest text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
              GYABUSKI
            </p>
            <p className="text-[8px] tracking-widest uppercase mt-0.5" style={{ color: '#C4B5FD' }}>
              {getTitle()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
            style={{ color: '#475569' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
          >
            <X size={15} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          {getContent()}
        </div>
      </div>
    </>
  )
}