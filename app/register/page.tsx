'use client'

import Link from 'next/link'
import { Mail, Lock, Eye, Quote } from 'lucide-react'

export default function AuthPage() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#050510' }}>
      {/* BACKGROUND SYSTEM */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/backgrounds/background.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      />
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(0, 0, 0, 0.55)' }} />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.72) 100%)'
        }}
      />
      <div
        className="absolute z-[3] pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.04) 40%, transparent 75%)',
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

          {/* DECORATIVE DIVIDER */}
          <div className="flex items-center justify-center" style={{ marginBottom: '42px' }}>
            <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent 0%, #7C3AED 100%)' }} />
            <div
              className="w-2 h-2 rounded-full mx-2"
              style={{
                backgroundColor: '#7C3AED',
                boxShadow: '0 0 10px #7C3AED, 0 0 20px rgba(124, 58, 237, 0.50)'
              }}
            />
            <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent 0%, #7C3AED 100%)' }} />
          </div>

          {/* EMOTIONAL QUOTE */}
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

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-6 pb-16 lg:pr-20 lg:pb-0">
          {/* AUTH CARD */}
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
            {/* CARD TITLE */}
            <h2
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '36px',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.96)',
                marginBottom: '8px'
              }}
            >
              Create your space
            </h2>

            {/* CARD SUBTITLE */}
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '28px'
              }}
            >
              Your identity will remain hidden.
            </p>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              className="w-full flex items-center justify-center transition-all duration-300"
              style={{
                height: '52px',
                background: 'rgba(10,10,18,0.45)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px',
                gap: '12px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(18,18,28,0.60)'
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(10,10,18,0.45)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.5 12.28c0-.86-.08-1.68-.22-2.48H12v4.7h6.45c-.28 1.48-1.11 2.73-2.36 3.57v2.98h3.82c2.24-2.06 3.53-5.1 3.53-8.77z" fill="#4285F4"/>
                <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.82-2.98c-1.08.72-2.45 1.15-4.11 1.15-3.16 0-5.83-2.13-6.79-5h-3.95v3.09C3.53 21.3 7.4 24 12 24z" fill="#34A853"/>
                <path d="M5.21 14.26c-.25-.72-.39-1.49-.39-2.26s.14-1.54.39-2.26V6.65H1.26C.46 8.24 0 10.06 0 12s.46 3.76 1.26 5.35l3.95-3.09z" fill="#FBBC05"/>
                <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.45-3.45C17.95 1.19 15.24 0 12 0 7.4 0 3.53 2.7 1.26 6.65l3.95 3.09c.96-2.87 3.63-5 6.79-5z" fill="#EA4335"/>
              </svg>
              <span className="text-sm" style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.88)' }}>
                Continue with Google
              </span>
            </button>

            {/* DIVIDER */}
            <div className="flex items-center" style={{ margin: '28px 0' }}>
              <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <span className="text-[13px] mx-4" style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.28)' }}>
                or
              </span>
              <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
            </div>

            {/* EMAIL INPUT */}
            <div className="relative">
              <Mail size={18} color="rgba(255,255,255,0.30)" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                placeholder="Email address"
                className="w-full focus:outline-none"
                style={{
                  height: '54px',
                  background: 'rgba(10,10,18,0.30)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                  paddingLeft: '48px',
                  paddingRight: '16px',
                  color: 'white',
                  fontFamily: 'Inter'
                }}
              />
            </div>

            {/* PASSWORD INPUT */}
            <div className="relative" style={{ marginTop: '14px' }}>
              <Lock size={18} color="rgba(255,255,255,0.30)" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                placeholder="Password (min 8 chars)"
                className="w-full focus:outline-none"
                style={{
                  height: '54px',
                  background: 'rgba(10,10,18,0.30)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                  paddingLeft: '48px',
                  paddingRight: '48px',
                  color: 'white',
                  fontFamily: 'Inter'
                }}
              />
              <Eye size={18} color="rgba(255,255,255,0.30)" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* CREATE ACCOUNT BUTTON */}
            <button
              type="submit"
              className="w-full transition-all duration-300"
              style={{
                height: '54px',
                marginTop: '24px',
                background: 'rgba(10,10,18,0.55)',
                border: '1px solid rgba(124,58,237,0.18)',
                borderRadius: '14px',
                fontFamily: 'Inter',
                fontWeight: 500,
                color: '#A78BFA'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.12)'
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.40)'
                e.currentTarget.style.boxShadow = '0 0 30px rgba(124,58,237,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(10,10,18,0.55)'
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.18)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Create account
            </button>

            {/* BOTTOM LOGIN TEXT */}
            <p className="text-center" style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginTop: '22px' }}>
              Already have an account?{' '}
              <Link href="/login" className="hover:underline" style={{ color: '#A78BFA' }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}