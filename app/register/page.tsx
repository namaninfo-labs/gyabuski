'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, Quote, ArrowLeft, ShieldCheck } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { generateAnonId } from '@/lib/generateId'

type Step = 'form' | 'otp' | 'done'

export default function RegisterPage() {
  const [step, setStep] = useState<Step>('form')

  // Form fields
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)

  // OTP field
  const [otp, setOtp] = useState('')

  // State
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [anonId] = useState(() => generateAnonId())

  // ── STEP 1: Register → sends OTP email ──
  async function handleRegister() {
    if (!email || !password) return
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    setLoading(true)
    setError('')

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      }
    })

    if (otpError) {
      setError(otpError.message)
      setLoading(false)
      return
    }

    setLoading(false)
    setStep('otp')
  }

  // ── STEP 2: Verify OTP ──
  async function handleVerifyOtp() {
    if (!otp || otp.length < 6) {
      setError('Please enter the 6-digit code')
      return
    }
    setLoading(true)
    setError('')

    const { data, error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    })

    if (verifyError) {
      setError('Invalid or expired code. Please try again.')
      setLoading(false)
      return
    }

    if (data.user) {
      await supabase.auth.updateUser({ password: password })
      await supabase.from('profiles').upsert([{
        id: data.user.id,
        anon_id: anonId,
      }])
    }

    setLoading(false)
    setStep('done')
  }

  // ── Resend OTP ──
  async function handleResend() {
    setError('')
    const { error: e } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true }
    })
    if (e) {
      setError('Could not resend. Try again.')
    } else {
      alert('New code sent!')
    }
  }

  // ── LEFT SIDE (same on all steps) ──
  const LeftSide = () => (
    <div className="flex flex-col justify-center items-center px-6 py-16 lg:px-20 lg:py-0 min-w-0">
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
      <div className="flex items-center justify-center" style={{ marginBottom: '42px' }}>
        <div className="h-px w-20" style={{ background: 'linear-gradient(to right, transparent, #7C3AED)' }} />
        <div className="w-2 h-2 rounded-full mx-2" style={{ backgroundColor: '#7C3AED', boxShadow: '0 0 10px #7C3AED, 0 0 20px rgba(124,58,237,0.50)' }} />
        <div className="h-px w-20" style={{ background: 'linear-gradient(to left, transparent, #7C3AED)' }} />
      </div>
      <div className="relative text-center px-8" style={{ maxWidth: '520px' }}>
        <div className="flex items-start justify-center gap-3">
          <Quote size={24} color="#7C3AED" style={{ opacity: 0.6, flexShrink: 0, marginTop: '4px' }} />
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 300,
            fontSize: 'clamp(1.6rem, 2.5vw, 2.6rem)',
            lineHeight: 1.45,
            color: 'rgba(255,255,255,0.92)'
          }}>
            Some things are easier<br />
            to <span style={{ color: '#A78BFA' }}>write</span> than to say.
          </p>
          <Quote size={24} color="#7C3AED" style={{ opacity: 0.6, flexShrink: 0, transform: 'rotate(180deg)', marginTop: '4px' }} />
        </div>
      </div>
    </div>
  )

  // ── BACKGROUND ──
  const Background = () => (
    <>
      <div className="absolute inset-0 z-0" style={{ backgroundImage: 'url(/backgrounds/background.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center center' }} />
      <div className="absolute inset-0 z-[1]" style={{ background: 'rgba(0,0,0,0.55)' }} />
      <div className="absolute inset-0 z-[2]" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.72) 100%)' }} />
      <div className="absolute z-[3] pointer-events-none" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '700px', height: '500px', background: 'radial-gradient(ellipse at center, rgba(124,58,237,0.10) 0%, transparent 75%)', filter: 'blur(40px)' }} />
    </>
  )

  // ── CARD STYLE ──
  const cardStyle: React.CSSProperties = {
    maxWidth: '420px',
    width: '100%',
    background: 'rgba(7,7,14,0.30)',
    backdropFilter: 'blur(18px)',
    WebkitBackdropFilter: 'blur(18px)',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 0 120px rgba(124,58,237,0.08), 0 20px 50px rgba(0,0,0,0.45)',
    borderRadius: '24px',
    padding: '40px'
  }

  // ══════════════════════════════════════
  // STEP: DONE (Success screen)
  // ══════════════════════════════════════
  if (step === 'done') return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#050510' }}>
      <Background />
      <div className="relative z-10 text-center px-6" style={{ maxWidth: '440px' }}>
        {/* Success icon */}
        <div className="mx-auto mb-6 flex items-center justify-center" style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(124,58,237,0.12)', border: '1px solid rgba(124,58,237,0.30)' }}>
          <ShieldCheck size={32} color="#C4B5FD" />
        </div>

        <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '28px', fontWeight: 300, color: 'rgba(255,255,255,0.96)', marginBottom: '10px' }}>
          You&apos;re in.
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.40)', lineHeight: 1.6, marginBottom: '32px' }}>
          Your space has been created.<br />Welcome to GYABUSKI.
        </p>

        {/* Anon ID card */}
        <div style={{ background: 'rgba(7,7,14,0.60)', backdropFilter: 'blur(16px)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '16px', padding: '24px', marginBottom: '28px' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>
            Your anonymous identity
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: 600, color: '#C4B5FD', letterSpacing: '0.08em', marginBottom: '8px' }}>
            {anonId}
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.20)', lineHeight: 1.5 }}>
            This is who you are here.<br />No one knows your real name.
          </p>
        </div>

        <Link
          href="/login"
          className="inline-block transition-all duration-200 hover:opacity-80"
          style={{
            fontFamily: 'Inter',
            fontSize: '14px',
            color: 'white',
            background: '#7C3AED',
            padding: '12px 32px',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(124,58,237,0.35)',
            textDecoration: 'none'
          }}
        >
          Go to Login
        </Link>
      </div>
    </div>
  )

  // ══════════════════════════════════════
  // STEP: OTP (Verify code)
  // ══════════════════════════════════════
  if (step === 'otp') return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#050510' }}>
      <Background />
      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_520px]">
        <LeftSide />
        <div className="flex items-center justify-center px-6 pb-16 lg:pr-20 lg:pb-0">
          <div style={cardStyle}>

            {/* Back button */}
            <button
              onClick={() => { setStep('form'); setOtp(''); setError('') }}
              className="flex items-center gap-2 mb-6 transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <ArrowLeft size={14} /> Back
            </button>

            {/* Mail icon */}
            <div className="flex items-center justify-center mb-6">
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(124,58,237,0.10)', border: '1px solid rgba(124,58,237,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={24} color="#C4B5FD" />
              </div>
            </div>

            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '28px', fontWeight: 300, color: 'rgba(255,255,255,0.96)', marginBottom: '8px', textAlign: 'center' }}>
              Check your email
            </h2>
            <p style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.35)', marginBottom: '32px', textAlign: 'center', lineHeight: 1.6 }}>
              We sent a 6-digit code to<br />
              <span style={{ color: '#C4B5FD' }}>{email}</span>
            </p>

            {/* OTP Input */}
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit code"
              value={otp}
              onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); setError('') }}
              onKeyDown={e => e.key === 'Enter' && handleVerifyOtp()}
              className="w-full focus:outline-none text-center"
              style={{
                height: '60px',
                background: 'rgba(10,10,18,0.40)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px',
                color: 'white',
                fontFamily: 'Inter',
                fontSize: '24px',
                fontWeight: 600,
                letterSpacing: '0.3em',
              }}
            />

            {error && (
              <p style={{ fontFamily: 'Inter', fontSize: '13px', color: '#EC4899', marginTop: '12px', textAlign: 'center' }}>
                {error}
              </p>
            )}

            {/* Verify button */}
            <button
              onClick={handleVerifyOtp}
              disabled={loading || otp.length < 6}
              className="w-full transition-all duration-300 disabled:opacity-40"
              style={{
                height: '54px',
                marginTop: '20px',
                background: 'linear-gradient(135deg, #7C3AED 0%, #6d28d9 100%)',
                border: 'none',
                borderRadius: '14px',
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '15px',
                color: '#FFFFFF',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 20px rgba(124,58,237,0.35)'
              }}
            >
              {loading ? 'Verifying...' : 'Verify & Create Account'}
            </button>

            {/* Resend */}
            <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.30)', marginTop: '20px', textAlign: 'center' }}>
              Didn&apos;t receive it?{' '}
              <button
                onClick={handleResend}
                style={{ color: '#A78BFA', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: '13px' }}
                className="hover:underline"
              >
                Resend code
              </button>
            </p>

          </div>
        </div>
      </div>
    </div>
  )

  // ══════════════════════════════════════
  // STEP: FORM (Email + Password)
  // ══════════════════════════════════════
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#050510' }}>
      <Background />
      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_520px]">
        <LeftSide />
        <div className="flex items-center justify-center px-6 pb-16 lg:pr-20 lg:pb-0">
          <div style={cardStyle}>

            <h2 style={{ fontFamily: 'Inter, sans-serif', fontSize: '36px', fontWeight: 300, color: 'rgba(255,255,255,0.96)', marginBottom: '8px' }}>
              Create your space
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', fontWeight: 400, color: 'rgba(255,255,255,0.45)', marginBottom: '32px' }}>
              Your identity will remain hidden.
            </p>

            {/* EMAIL */}
            <div className="relative">
              <Mail size={18} color="rgba(255,255,255,0.30)" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full focus:outline-none placeholder-[rgba(255,255,255,0.25)]"
                style={{ height: '54px', background: 'rgba(10,10,18,0.30)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', paddingLeft: '48px', paddingRight: '16px', color: 'white', fontFamily: 'Inter', fontSize: '15px' }}
              />
            </div>

            {/* PASSWORD */}
            <div className="relative" style={{ marginTop: '14px' }}>
              <Lock size={18} color="rgba(255,255,255,0.30)" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Password (min 8 chars)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRegister()}
                className="w-full focus:outline-none placeholder-[rgba(255,255,255,0.25)]"
                style={{ height: '54px', background: 'rgba(10,10,18,0.30)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', paddingLeft: '48px', paddingRight: '48px', color: 'white', fontFamily: 'Inter', fontSize: '15px' }}
              />
              <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2">
                {showPw ? <EyeOff size={18} color="rgba(255,255,255,0.30)" /> : <Eye size={18} color="rgba(255,255,255,0.30)" />}
              </button>
            </div>

            {error && (
              <p style={{ fontFamily: 'Inter', fontSize: '13px', color: '#EC4899', marginTop: '12px', textAlign: 'center' }}>
                {error}
              </p>
            )}

            {/* CREATE BUTTON */}
            <button
              onClick={handleRegister}
              disabled={loading || !email || !password}
              className="w-full transition-all duration-300 disabled:opacity-40"
              style={{
                height: '54px',
                marginTop: '24px',
                background: 'rgba(10,10,18,0.55)',
                border: '1px solid rgba(124,58,237,0.18)',
                borderRadius: '14px',
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '15px',
                color: '#A78BFA',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = 'rgba(124,58,237,0.12)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.40)' } }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,10,18,0.55)'; e.currentTarget.style.borderColor = 'rgba(124,58,237,0.18)' }}
            >
              {loading ? 'Sending code...' : 'Continue'}
            </button>

            <p className="text-center" style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginTop: '22px' }}>
              Already have an account?{' '}
              <Link href="/login" className="hover:underline" style={{ color: '#A78BFA' }}>Sign in</Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}