'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, Quote } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSignIn() {
    if (!email || !password) return
    setLoading(true)
    setError('')
    const { error: e } = await supabase.auth.signInWithPassword({ email, password })
    if (e) {
      setError(e.message)
      setLoading(false)
    } else {
      window.location.href = '/home'
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#050510' }}>

      {/* BACKGROUND */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/backgrounds/background.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      />
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(0,0,0,0.55)' }} />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.72) 100%)'
        }}
      />
      <div
        className="absolute z-[3] pointer-events-none"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.10) 0%, transparent 75%)',
          filter: 'blur(40px)'
        }}
      />

      {/* PAGE CONTENT */}
      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_520px]">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center items-center px-6 py-16 lg:px-20 lg:py-0 min-w-0">

          {/* LOGO */}
          <h1
            className="text-center select-none"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)',
              letterSpacing: '0.55em',
              color: '#FFFFFF',
              textShadow: '0 0 40px rgba(255,255,255,0.10), 0 0 80px rgba(124,58,237,0.08)',
              marginBottom: '14px',
              whiteSpace: 'nowrap'
            }}
          >
            G Y A B U S K I
          </h1>

          {/* TAGLINE */}
          <p
            className="text-center uppercase"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '0.42em',
              color: '#C4B5FD',
              marginBottom: '36px'
            }}
          >
            anonymous emotional archive
          </p>

          {/* DIVIDER */}
          <div className="flex items-center justify-center" style={{ marginBottom: '42px' }}>
            <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, #7C3AED)' }} />
            <div
              className="w-2 h-2 rounded-full mx-2"
              style={{
                backgroundColor: '#7C3AED',
                boxShadow: '0 0 10px #7C3AED, 0 0 20px rgba(124,58,237,0.50)'
              }}
            />
            <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, #7C3AED)' }} />
          </div>

          {/* QUOTE */}
          <div className="relative text-center px-8" style={{ maxWidth: '520px' }}>
            <div className="flex items-start justify-center gap-3">
              <Quote size={24} color="#7C3AED" style={{ opacity: 0.6, flexShrink: 0, marginTop: '4px' }} />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontWeight: 300,
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.6rem)',
                  lineHeight: 1.45,
                  color: 'rgba(255,255,255,0.92)'
                }}
              >
                Some things are easier<br />
                to <span style={{ color: '#A78BFA' }}>write</span> than to say.
              </p>
              <Quote size={24} color="#7C3AED" style={{ opacity: 0.6, flexShrink: 0, transform: 'rotate(180deg)', marginTop: '4px' }} />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — FORM */}
        <div className="flex items-center justify-center px-6 pb-16 lg:pr-20 lg:pb-0">
          <div
            className="w-full"
            style={{
              maxWidth: '420px',
              background: 'rgba(7,7,14,0.30)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 0 120px rgba(124,58,237,0.08), 0 20px 50px rgba(0,0,0,0.45)',
              borderRadius: '24px',
              padding: '40px'
            }}
          >
            <h2
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '36px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.96)',
                marginBottom: '8px'
              }}
            >
              Welcome back
            </h2>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '32px'
              }}
            >
              Sign in to continue your journey
            </p>

            {/* EMAIL */}
            <div className="relative">
              <Mail
                size={18}
                color="rgba(255,255,255,0.30)"
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full focus:outline-none placeholder-[rgba(255,255,255,0.25)]"
                style={{
                  height: '54px',
                  background: 'rgba(10,10,18,0.30)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '15px'
                }}
              />
            </div>

            {/* PASSWORD */}
            <div className="relative" style={{ marginTop: '14px' }}>
              <Lock
                size={18}
                color="rgba(255,255,255,0.30)"
                className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSignIn()}
                className="w-full focus:outline-none placeholder-[rgba(255,255,255,0.25)]"
                style={{
                  height: '54px',
                  background: 'rgba(10,10,18,0.30)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                  paddingLeft: '48px',
                  paddingRight: '48px',
                  color: 'white',
                  fontFamily: 'Inter',
                  fontSize: '15px'
                }}
              />
              <button
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPw
                  ? <EyeOff size={18} color="rgba(255,255,255,0.30)" />
                  : <Eye size={18} color="rgba(255,255,255,0.30)" />
                }
              </button>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="flex justify-end" style={{ marginTop: '10px' }}>
              <Link
                href="/forgot-password"
                className="text-[13px] hover:underline"
                style={{ fontFamily: 'Inter', color: '#A78BFA' }}
              >
                Forgot password?
              </Link>
            </div>

            {/* ERROR */}
            {error && (
              <p
                className="text-center"
                style={{
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  color: '#EC4899',
                  marginTop: '16px'
                }}
              >
                {error}
              </p>
            )}

            {/* SIGN IN BUTTON */}
            <button
              onClick={handleSignIn}
              disabled={loading || !email || !password}
              className="w-full transition-all duration-300 disabled:opacity-40"
              style={{
                height: '54px',
                marginTop: '24px',
                background: 'linear-gradient(135deg, #7C3AED 0%, #6d28d9 100%)',
                border: 'none',
                borderRadius: '14px',
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '15px',
                color: '#FFFFFF',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 20px rgba(124,58,237,0.40), 0 0 40px rgba(124,58,237,0.15)'
              }}
              onMouseEnter={e => {
                if (!loading) {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #8b46ff 0%, #7c3aed 100%)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #7C3AED 0%, #6d28d9 100%)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* SIGN UP LINK */}
            <p
              className="text-center"
              style={{
                fontFamily: 'Inter',
                fontSize: '14px',
                color: 'rgba(255,255,255,0.45)',
                marginTop: '22px'
              }}
            >
              Don&apos;t have an account?{' '}
              <Link href="/register" className="hover:underline" style={{ color: '#A78BFA' }}>
                Sign up
              </Link>
            </p>

            {/* INFO BOX */}
            <div
              className="text-center"
              style={{
                marginTop: '24px',
                padding: '16px',
                background: 'rgba(10,10,18,0.25)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px'
              }}
            >
              <p style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
                Login is only to remember your space.<br />
                Your identity stays hidden from everyone.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}