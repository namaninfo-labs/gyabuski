'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Menu,
  ChevronDown,
  Quote,
  BookOpen,
  PenLine,
  LockKeyhole,
  ShieldCheck,
  Heart,
  User,
  UserCircle2,
  Settings,
  LogOut,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Cormorant_Garamond, Inter } from 'next/font/google';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export default function HomePage() {
  const router = useRouter();
  const [soulsCount, setSoulsCount] = useState(134);
  const [userAnonId, setUserAnonId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSoulsCount(Math.floor(Math.random() * 50) + 100);

    const checkAuth = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          router.push('/');
          return;
        }
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('anon_id')
          .eq('id', user.id)
          .single();

        if (profileError) {
          console.error('Profile fetch error:', profileError);
        } else if (profile?.anon_id) {
          setUserAnonId(profile.anon_id);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
  }

  if (loading) {
    return (
      <div className={`${cormorant.variable} ${inter.variable} min-h-screen bg-[#0D0D14] flex items-center justify-center`}>
        <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className={`${cormorant.variable} ${inter.variable} relative min-h-screen w-full overflow-hidden bg-[#0D0D14]`}>

      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/backgrounds/background.jpeg)' }}
      />
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.55)]" />
      <div
        className="fixed inset-0"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 100%)' }}
      />

      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-5">

        {/* Left — Hamburger */}
        <button
          className="w-10 h-10 rounded-full border border-[rgba(124,58,237,0.5)] flex items-center justify-center transition-colors hover:bg-[rgba(124,58,237,0.1)]"
          aria-label="Menu"
        >
          <Menu size={18} color="#C4B5FD" />
        </button>

        {/* Right — Souls + Avatar + Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs text-gray-400" style={{ fontFamily: 'var(--font-inter)' }}>
              {soulsCount} souls active
            </span>
          </div>

          <div className="h-4 w-px bg-[rgba(255,255,255,0.15)]" />

          {/* Avatar + Username — CLICKABLE DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#1a1a2e] flex items-center justify-center">
                <User size={16} color="#C4B5FD" />
              </div>
              <span className="font-mono text-sm text-[#C4B5FD]" style={{ fontFamily: 'var(--font-inter)' }}>
                {userAnonId}
              </span>
              <ChevronDown
                size={14}
                color="#C4B5FD"
                style={{
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 200ms ease'
                }}
              />
            </button>

            {/* DROPDOWN MENU */}
            {dropdownOpen && (
              <div
                className="absolute right-0 top-12 z-50 overflow-hidden"
                style={{
                  width: '180px',
                  background: '#13131E',
                  border: '1px solid rgba(45,45,66,0.8)',
                  borderRadius: '16px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                }}
              >
                {/* User info top */}
                <div
                  className="px-4 py-3 border-b"
                  style={{ borderColor: 'rgba(45,45,66,0.6)' }}
                >
                  <p className="text-[#475569] text-[10px] uppercase tracking-widest mb-0.5" style={{ fontFamily: 'var(--font-inter)' }}>
                    Signed in as
                  </p>
                  <p className="text-[#C4B5FD] text-sm font-mono" style={{ fontFamily: 'var(--font-inter)' }}>
                    {userAnonId}
                  </p>
                </div>

                {/* Menu items */}
                <div className="py-1.5">
                  <button
                    onClick={() => { setDropdownOpen(false); router.push('/profile'); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[#94A3B8] text-sm hover:text-white hover:bg-[#1A1A2E] transition-colors text-left"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    <UserCircle2 size={14} />
                    View Profile
                  </button>

                  <button
                    onClick={() => { setDropdownOpen(false); router.push('/settings'); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[#94A3B8] text-sm hover:text-white hover:bg-[#1A1A2E] transition-colors text-left"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    <Settings size={14} />
                    Settings
                  </button>
                </div>

                <div className="border-t" style={{ borderColor: 'rgba(45,45,66,0.6)' }}>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[#EC4899] text-sm hover:bg-[#1A1A2E] transition-colors text-left"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center w-full max-w-[560px]">

          {/* Logo */}
          <h1
            className="text-white text-center whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(2.2rem, 4vw, 4rem)',
              fontWeight: 300,
              letterSpacing: '0.45em',
              textShadow: '0 0 20px rgba(124,58,237,0.3), 0 0 40px rgba(124,58,237,0.1)'
            }}
          >
            G Y A B U S K I
          </h1>

          {/* Tagline */}
          <p
            className="mt-2 text-[#C4B5FD] lowercase"
            style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '10px', fontWeight: 300, letterSpacing: '0.35em' }}
          >
            anonymous emotional archive
          </p>

          {/* Divider */}
          <div className="flex items-center gap-0 mt-5 mb-5">
            <div className="w-[50px] h-px bg-[#2D2D42]" />
            <div className="w-[6px] h-[6px] rounded-full bg-[#7C3AED] mx-2" style={{ boxShadow: '0 0 8px rgba(124,58,237,0.8)' }} />
            <div className="w-[50px] h-px bg-[#2D2D42]" />
          </div>

          {/* Quote */}
          <div className="relative w-full mb-6">
            <div className="flex items-start justify-center gap-3 px-4">
              <Quote size={24} color="#7C3AED" className="flex-shrink-0 mt-1 opacity-70" />
              <p
                className="text-[rgba(255,255,255,0.90)] text-center leading-relaxed"
                style={{ fontFamily: 'var(--font-cormorant), serif', fontSize: 'clamp(1.2rem, 2vw, 1.7rem)', fontWeight: 300 }}
              >
                Some feelings don&apos;t need answers, they just need a{' '}
                <span className="text-[#A78BFA]">page</span>.
              </p>
              <Quote size={24} color="#7C3AED" className="flex-shrink-0 mt-1 opacity-70" style={{ transform: 'rotate(180deg)' }} />
            </div>
          </div>

          {/* Read / Write Card */}
          <div
            className="w-full flex rounded-2xl overflow-hidden mb-3"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}
          >
            <button
              onClick={() => router.push('/feed')}
              className="flex-1 flex flex-col items-center justify-center py-6 px-4 gap-2 transition-colors hover:bg-[rgba(124,58,237,0.06)]"
            >
              <BookOpen size={28} color="#7C3AED" strokeWidth={1.5} />
              <span className="text-white font-semibold text-lg" style={{ fontFamily: 'var(--font-inter)' }}>Read</span>
              <span className="text-[#94A3B8] text-[13px]" style={{ fontFamily: 'var(--font-inter)' }}>anonymous stories</span>
            </button>

            <div className="w-px bg-[rgba(255,255,255,0.08)] my-4" />

            <button
              onClick={() => router.push('/write')}
              className="flex-1 flex flex-col items-center justify-center py-6 px-4 gap-2 transition-colors hover:bg-[rgba(124,58,237,0.06)]"
            >
              <PenLine size={28} color="#7C3AED" strokeWidth={1.5} />
              <span className="text-white font-semibold text-lg" style={{ fontFamily: 'var(--font-inter)' }}>Write</span>
              <span className="text-[#94A3B8] text-[13px]" style={{ fontFamily: 'var(--font-inter)' }}>share your thoughts</span>
            </button>
          </div>

          {/* Three Pillars */}
          <div
            className="w-full flex rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.04)',
              backdropFilter: 'blur(4px)',
            }}
          >
            {[
              { Icon: LockKeyhole, label: 'No names' },
              { Icon: ShieldCheck, label: 'Total privacy' },
              { Icon: Heart, label: 'Real feelings' },
            ].map(({ Icon, label }, i) => (
              <div key={label} className="flex items-center flex-1">
                {i > 0 && <div className="w-px bg-[rgba(255,255,255,0.05)] my-3 flex-shrink-0" style={{ height: '40px' }} />}
                <div className="flex-1 flex flex-col items-center justify-center py-4 px-2 gap-1.5">
                  <Icon size={20} color="#475569" strokeWidth={1.5} />
                  <span className="text-[#94A3B8] text-[13px]" style={{ fontFamily: 'var(--font-inter)' }}>{label}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Bottom Tagline */}
      <div className="fixed bottom-0 left-0 right-0 z-10 flex flex-col items-center pb-8 pointer-events-none">
        <p className="text-center" style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.25)' }}>
          What&apos;s on your mind tonight?
        </p>
        <p className="text-center mt-1" style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '14px', fontWeight: 300, color: 'rgba(255,255,255,0.25)' }}>
          Write it out. Read what stays.
        </p>
      </div>
    </div>
  );
}