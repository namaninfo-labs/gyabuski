'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import {
  BookOpen, Pen, Heart, TrendingUp,
  Bookmark, FileText, Clock, ChevronRight,
  Lock, Shield, User, ChevronDown, LogOut,
} from 'lucide-react'

// Unsplash free — dark rainy room with lamp, emotional loneliness atmosphere
const BG = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=90&auto=format&fit=crop'

export default function HomePage() {
  const [anonId, setAnonId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    async function checkUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('profiles').select('anon_id').eq('id', user.id).single()
        if (data) setAnonId(data.anon_id)
      }
    }
    checkUser()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    setAnonId(null)
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#0D0D14] flex overflow-hidden relative">

      {/* ══════════ ATMOSPHERIC BACKGROUND ══════════ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Cinematic hero image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${BG})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.28,
          }}
        />
        {/* Deep gradient overlay — strong left, fading right */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, #0D0D14 0%, #0D0D14 30%, rgba(13,13,20,0.92) 55%, rgba(13,13,20,0.55) 80%, rgba(13,13,20,0.35) 100%)',
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '40%',
            background: 'linear-gradient(to top, #0D0D14 0%, transparent 100%)',
          }}
        />
        {/* Purple atmospheric glow — top center */}
        <div
          className="absolute"
          style={{
            top: '-120px',
            left: '50%',
            transform: 'translateX(-10%)',
            width: '700px',
            height: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Secondary glow — bottom right */}
        <div
          className="absolute"
          style={{
            bottom: '-80px',
            right: '10%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,40,200,0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* ══════════ LEFT SIDEBAR ══════════ */}
      <aside
        className="relative z-10 flex-shrink-0 min-h-screen flex flex-col"
        style={{
          width: '300px',
          padding: '40px 20px 32px',
          borderRight: '1px solid rgba(45,45,66,0.5)',
          background: 'linear-gradient(180deg, rgba(13,13,20,0.6) 0%, rgba(13,13,20,0.8) 100%)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* EXPLORE SECTION */}
        <div className="mb-8">
          <p
            className="text-[#475569] uppercase px-2 mb-4"
            style={{ fontSize: '9px', letterSpacing: '0.28em', fontWeight: 500 }}
          >
            Explore
          </p>

          <div className="flex flex-col gap-2.5">
            {/* READ — active/highlighted */}
            <Link
              href="/feed"
              className="group flex items-center justify-between rounded-2xl transition-all duration-300"
              style={{
                padding: '14px 16px',
                background: 'rgba(124,58,237,0.12)',
                border: '1px solid rgba(124,58,237,0.22)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(124,58,237,0.18)'
                el.style.border = '1px solid rgba(124,58,237,0.35)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(124,58,237,0.12)'
                el.style.border = '1px solid rgba(124,58,237,0.22)'
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{
                    width: '36px', height: '36px',
                    background: 'rgba(124,58,237,0.2)',
                    border: '1px solid rgba(124,58,237,0.25)',
                  }}
                >
                  <BookOpen size={15} color="#C4B5FD" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">Read</p>
                  <p className="text-[#475569] mt-0.5" style={{ fontSize: '10px' }}>anonymous stories</p>
                </div>
              </div>
              <ChevronRight size={13} color="#7C3AED" />
            </Link>

            {/* WRITE */}
            <Link
              href="/write"
              className="group flex items-center justify-between rounded-2xl transition-all duration-300"
              style={{
                padding: '14px 16px',
                background: 'transparent',
                border: '1px solid rgba(45,45,66,0.8)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(19,19,30,0.9)'
                el.style.border = '1px solid rgba(61,61,92,0.8)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'transparent'
                el.style.border = '1px solid rgba(45,45,66,0.8)'
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center rounded-xl flex-shrink-0"
                  style={{
                    width: '36px', height: '36px',
                    background: 'rgba(19,19,30,0.9)',
                    border: '1px solid rgba(45,45,66,0.8)',
                  }}
                >
                  <Pen size={15} color="#94A3B8" />
                </div>
                <div>
                  <p className="text-[#E2E8F0] text-sm font-semibold leading-tight">Write</p>
                  <p className="text-[#475569] mt-0.5" style={{ fontSize: '10px' }}>share your thoughts</p>
                </div>
              </div>
              <ChevronRight size={13} color="#475569" />
            </Link>
          </div>
        </div>

        {/* QUICK ACCESS */}
        <div className="mb-8">
          <p
            className="text-[#475569] uppercase px-2 mb-3"
            style={{ fontSize: '9px', letterSpacing: '0.28em', fontWeight: 500 }}
          >
            Quick Access
          </p>
          <div className="flex flex-col">
            {[
              { label: 'Latest Whispers', href: '/feed', icon: BookOpen, dot: true },
              { label: 'Most Liked', href: '/feed?sort=liked', icon: Heart },
              { label: 'Trending', href: '/feed?sort=trending', icon: TrendingUp },
              { label: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
              { label: 'My Stories', href: '/my-stories', icon: FileText },
            ].map(item => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#13131E]/70 transition-all duration-150 group"
              >
                <div className="flex items-center gap-2.5">
                  <item.icon size={14} className="text-[#475569] group-hover:text-[#C4B5FD] transition-colors flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.dot
                  ? <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" style={{ boxShadow: '0 0 6px rgba(124,58,237,0.8)' }} />
                  : <ChevronRight size={12} className="text-[#2D2D42] group-hover:text-[#475569] transition-colors" />
                }
              </Link>
            ))}
          </div>
        </div>

        {/* YOUR SPACE */}
        <div className="mb-8">
          <p
            className="text-[#475569] uppercase px-2 mb-3"
            style={{ fontSize: '9px', letterSpacing: '0.28em', fontWeight: 500 }}
          >
            Your Space
          </p>
          <div className="flex flex-col">
            {[
              { label: 'Drafts', href: '/drafts', icon: FileText },
              { label: 'History', href: '/history', icon: Clock },
            ].map(item => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#13131E]/70 transition-all duration-150 group"
              >
                <item.icon size={14} className="text-[#475569] group-hover:text-[#C4B5FD] transition-colors flex-shrink-0" />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* BOTTOM QUOTE CARD */}
        <div className="mt-auto">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(45,45,66,0.6)',
              background: 'linear-gradient(135deg, rgba(19,19,30,0.95) 0%, rgba(15,15,26,0.98) 100%)',
            }}
          >
            {/* faint BG texture */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url(${BG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="relative z-10 p-4">
              {/* pen icon */}
              <div className="mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                  <path d="m15 5 4 4"/>
                </svg>
              </div>
              <p
                className="text-[#94A3B8] italic leading-relaxed mb-3"
                style={{ fontSize: '11px' }}
              >
                "This is your space.<br />
                No identity.<br />
                Only honesty."
              </p>
              <div className="w-8 h-px bg-[#7C3AED] mb-3" />
              {mounted && anonId ? (
                <p className="text-[#C4B5FD] font-mono" style={{ fontSize: '12px' }}>{anonId}</p>
              ) : (
                <Link
                  href="/login"
                  className="text-[#7C3AED] hover:text-[#C4B5FD] transition-colors"
                  style={{ fontSize: '11px' }}
                >
                  Sign in to save your space →
                </Link>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* ══════════ RIGHT MAIN CONTENT ══════════ */}
      <div className="relative z-10 flex-1 flex flex-col min-h-screen">

        {/* TOP RIGHT — auth aware */}
        <div className="flex justify-end p-6">
          {mounted && anonId ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2.5 rounded-full transition-all duration-200"
                style={{
                  padding: '7px 14px 7px 8px',
                  background: 'rgba(19,19,30,0.85)',
                  border: '1px solid rgba(45,45,66,0.8)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: '28px', height: '28px',
                    background: 'linear-gradient(135deg, rgba(124,58,237,0.5) 0%, rgba(26,26,46,1) 100%)',
                    border: '1px solid rgba(124,58,237,0.3)',
                  }}
                >
                  <User size={13} color="#C4B5FD" />
                </div>
                <span className="text-white text-sm font-medium">{anonId}</span>
                <ChevronDown size={13} color="#475569" />
              </button>

              {menuOpen && (
                <div
                  className="absolute right-0 top-12 overflow-hidden z-50"
                  style={{
                    width: '176px',
                    background: '#13131E',
                    border: '1px solid rgba(45,45,66,0.8)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 40px rgba(0,0,0,0.7)',
                  }}
                >
                  <Link href="/feed" onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-[#94A3B8] text-sm hover:text-white hover:bg-[#1A1A2E] transition-colors">
                    <BookOpen size={13} /> Go to Feed
                  </Link>
                  <Link href="/my-stories" onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-3 text-[#94A3B8] text-sm hover:text-white hover:bg-[#1A1A2E] transition-colors">
                    <FileText size={13} /> My Stories
                  </Link>
                  <div className="h-px bg-[#2D2D42]" />
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-3 text-[#EC4899] text-sm hover:bg-[#1A1A2E] transition-colors">
                    <LogOut size={13} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-[#94A3B8] hover:text-white transition-all duration-200"
              style={{
                fontSize: '13px',
                padding: '8px 18px',
                borderRadius: '99px',
                border: '1px solid rgba(45,45,66,0.6)',
                background: 'rgba(19,19,30,0.6)',
                backdropFilter: 'blur(8px)',
              }}
            >
              Sign in
            </Link>
          )}
        </div>

        {/* ══ HERO CENTER ══ */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8 md:px-16"
          style={{ paddingBottom: '80px' }}
        >

          {/* LOGO — centered, luxury spaced */}
          <div
            className="mb-5 animate-fade-up"
            style={{ animationDelay: '0ms' }}
          >
            <h1
              className="text-white font-bold tracking-[0.45em] uppercase"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: '0.45em',
                textShadow: '0 0 60px rgba(124,58,237,0.12)',
              }}
            >
              GYABUSKI
            </h1>
          </div>

          {/* Tagline with lines */}
          <div
            className="flex items-center gap-4 mb-10 animate-fade-up"
            style={{ animationDelay: '60ms' }}
          >
            <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(196,181,253,0.4))' }} />
            <p
              className="text-[#C4B5FD] uppercase tracking-widest"
              style={{ fontSize: '10px', letterSpacing: '0.35em', fontWeight: 300 }}
            >
              anonymous emotional archive
            </p>
            <div style={{ width: '40px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(196,181,253,0.4))' }} />
          </div>

          {/* DIVIDER */}
          <div
            className="flex items-center gap-4 mb-12 animate-fade-up"
            style={{ animationDelay: '120ms' }}
          >
            <div style={{ width: '60px', height: '1px', background: 'rgba(45,45,66,0.8)' }} />
            <div
              style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#7C3AED',
                boxShadow: '0 0 10px rgba(124,58,237,0.8)',
              }}
            />
            <div style={{ width: '60px', height: '1px', background: 'rgba(45,45,66,0.8)' }} />
          </div>

          {/* QUOTE — cinematic, balanced */}
          <div
            className="mb-12 animate-fade-up"
            style={{ animationDelay: '180ms', maxWidth: '480px' }}
          >
            <p
              className="text-[#E2E8F0] font-light leading-relaxed"
              style={{ fontSize: 'clamp(1.3rem, 2.8vw, 1.65rem)', lineHeight: 1.5 }}
            >
              <span
                className="text-[#7C3AED]"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '3rem',
                  lineHeight: '0.5',
                  verticalAlign: 'middle',
                  marginRight: '6px',
                  opacity: 0.9,
                }}
              >
                "
              </span>
              Some things are easier to{' '}
              <em className="text-[#C4B5FD]" style={{ fontStyle: 'italic' }}>write</em>
              {' '}than to say.
              <span
                className="text-[#7C3AED]"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '3rem',
                  lineHeight: '0.5',
                  verticalAlign: 'middle',
                  marginLeft: '6px',
                  opacity: 0.9,
                }}
              >
                "
              </span>
            </p>
          </div>

          {/* 3 PILLARS — clean icons, dividers */}
          <div
            className="flex items-center mb-14 animate-fade-up"
            style={{ animationDelay: '240ms' }}
          >
            {[
              { Icon: Lock, label: 'No names' },
              { Icon: Shield, label: 'Total privacy' },
              { Icon: Heart, label: 'Real feelings' },
            ].map(({ Icon, label }, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center gap-2.5 px-10">
                  <Icon size={17} color="#475569" strokeWidth={1.5} />
                  <span className="text-[#94A3B8] text-xs tracking-wide">{label}</span>
                </div>
                {i < 2 && (
                  <div style={{ width: '1px', height: '32px', background: 'rgba(45,45,66,0.8)' }} />
                )}
              </div>
            ))}
          </div>

          {/* CTA BUTTONS — premium, large, weighted */}
          <div
            className="flex gap-4 mb-6 animate-fade-up"
            style={{ animationDelay: '300ms' }}
          >
            <Link
              href="/feed"
              className="flex items-center gap-2.5 transition-all duration-200 hover:scale-[1.02]"
              style={{
                padding: '13px 32px',
                borderRadius: '14px',
                border: '1px solid rgba(45,45,66,0.9)',
                background: 'rgba(19,19,30,0.7)',
                color: '#E2E8F0',
                fontSize: '14px',
                fontWeight: 500,
                backdropFilter: 'blur(8px)',
              }}
            >
              <BookOpen size={16} />
              Read
            </Link>
            <Link
              href="/write"
              className="flex items-center gap-2.5 transition-all duration-200 hover:scale-[1.02]"
              style={{
                padding: '13px 32px',
                borderRadius: '14px',
                background: '#7C3AED',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                boxShadow: '0 4px 24px rgba(124,58,237,0.4), 0 0 0 1px rgba(124,58,237,0.3)',
              }}
            >
              ✦ Write
            </Link>
          </div>

          {/* Auth links — only when not logged in */}
          {mounted && !anonId && (
            <div
              className="flex items-center gap-4 animate-fade-up"
              style={{ animationDelay: '360ms' }}
            >
              <Link href="/login" className="text-[#94A3B8] hover:text-[#C4B5FD] transition-colors" style={{ fontSize: '12px' }}>
                Sign in
              </Link>
              <span className="text-[#2D2D42]" style={{ fontSize: '12px' }}>·</span>
              <Link href="/register" className="text-[#94A3B8] hover:text-[#C4B5FD] transition-colors" style={{ fontSize: '12px' }}>
                New here? Create an account
              </Link>
            </div>
          )}

          {/* Bottom tagline */}
          <p
            className="text-[#2D2D42] font-mono animate-fade-up"
            style={{ fontSize: '11px', marginTop: '72px', letterSpacing: '0.05em', animationDelay: '420ms' }}
          >
            What's on your mind tonight? Write it out. Read what stays.
          </p>
        </div>
      </div>
    </div>
  )
}