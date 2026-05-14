import Link from 'next/link'
import { User, Mail, UserPlus, Heart } from 'lucide-react'

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col" style={{ backgroundColor: '#050510' }}>
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/backgrounds/background.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      />
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(0, 0, 0, 0.50)' }} />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.00) 40%, rgba(0,0,0,0.60) 100%)'
        }}
      />
      <div
        className="absolute z-[3] pointer-events-none"
        style={{
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.06) 0%, transparent 70%)'
        }}
      />
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex justify-end p-5">
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-full transition-all duration-[350ms] py-1.5 px-3 sm:py-2 sm:px-4 text-[13px] sm:text-sm font-normal bg-[rgba(10,10,18,0.40)] border border-[rgba(255,255,255,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:border-[rgba(124,58,237,0.50)] hover:bg-[rgba(15,15,28,0.55)] hover:shadow-[0_0_20px_rgba(124,58,237,0.12)]"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: 'rgba(255,255,255,0.80)',
              fontFamily: 'Inter'
            }}
          >
            <User size={13} color="#C4B5FD" />
            <span>Login / Sign Up</span>
          </Link>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-16">
          <h1
            className="text-center select-none mb-2.5"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: 'clamp(2rem, 5.5vw, 4.2rem)',
              letterSpacing: '0.55em',
              color: '#FFFFFF',
              textShadow: '0 0 40px rgba(255, 255, 255, 0.12), 0 0 80px rgba(124, 58, 237, 0.08)'
            }}
          >
            G Y A B U S K I
          </h1>
          <p
            className="block text-center uppercase mb-5"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '11px',
              letterSpacing: '0.45em',
              color: '#C4B5FD'
            }}
          >
            anonymous emotional archive
          </p>
          <div className="flex items-center justify-center mb-10">
            <div
              className="h-px w-20"
              style={{ background: 'linear-gradient(to right, transparent 0%, #7C3AED 100%)' }}
            />
            <div
              className="w-2 h-2 rounded-full mx-2"
              style={{
                backgroundColor: '#7C3AED',
                boxShadow: '0 0 10px #7C3AED, 0 0 20px rgba(124, 58, 237, 0.50)'
              }}
            />
            <div
              className="h-px w-20"
              style={{ background: 'linear-gradient(to left, transparent 0%, #7C3AED 100%)' }}
            />
          </div>
          <div className="w-full max-w-md mx-auto px-4 sm:px-0">
            <div
              className="p-6 sm:p-8 rounded-[18px]"
              style={{
                background: `
                  radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.05) 0%, transparent 50%),
                  linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.20) 100%),
                  rgba(10, 10, 18, 0.14)
                `,
                backdropFilter: 'blur(22px) saturate(130%)',
                WebkitBackdropFilter: 'blur(22px) saturate(130%)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderTop: '1px solid rgba(255, 255, 255, 0.10)',
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.06),
                  0 0 80px rgba(124, 58, 237, 0.08),
                  0 0 160px rgba(124, 58, 237, 0.04),
                  0 20px 40px rgba(0, 0, 0, 0.35)
                `
              }}
            >
              <p
                className="text-center mb-1.5"
                style={{
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#94A3B8'
                }}
              >
                Welcome
              </p>
              <p
                className="text-center mb-8"
                style={{
                  fontFamily: 'Inter',
                  fontSize: '18px',
                  fontWeight: 300,
                  color: '#FFFFFF'
                }}
              >
                Sign in to continue your journey
              </p>
              <div className="flex flex-row gap-3 w-full">
                <Link
                  href="/login"
                  className="flex-1 h-12 sm:h-[52px] flex items-center justify-center gap-2 rounded-[14px] transition-all duration-300 bg-[rgba(15,15,25,0.60)] border border-[rgba(255,255,255,0.10)] hover:bg-[rgba(25,25,40,0.70)] hover:border-[rgba(255,255,255,0.16)]"
                >
                  <Mail size={15} color="#C4B5FD" strokeWidth={1.5} />
                  <span className="text-sm font-normal" style={{ color: '#FFFFFF' }}>Sign In</span>
                </Link>
                <Link
                  href="/register"
                  className="flex-1 h-12 sm:h-[52px] flex items-center justify-center gap-2 rounded-[14px] border-none transition-all duration-300 bg-gradient-to-br from-[#7C3AED] to-[#6d28d9] shadow-[0_4px_20px_rgba(124,58,237,0.40),0_0_40px_rgba(124,58,237,0.15)] hover:from-[#8b46ff] hover:to-[#7c3aed] hover:shadow-[0_6px_25px_rgba(124,58,237,0.55),0_0_50px_rgba(124,58,237,0.25)] hover:-translate-y-px"
                >
                  <UserPlus size={15} color="#FFFFFF" strokeWidth={1.5} />
                  <span className="text-sm font-medium" style={{ color: '#FFFFFF' }}>Sign Up</span>
                </Link>
              </div>
              <div className="mt-6 flex items-center justify-center gap-1.5">
                <span className="text-xs font-normal" style={{ color: '#94A3B8' }}>
                  No identity. Only honesty.
                </span>
                <Heart size={11} color="#7C3AED" fill="#7C3AED" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}