'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleGoogle() {
    setLoading(true)
    await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{ redirectTo:`${window.location.origin}/auth/callback` }
    })
  }

  async function handleEmail() {
    if (!email || !password) return
    setLoading(true); setError('')
    const { error:e } = await supabase.auth.signInWithPassword({ email, password })
    if (e) { setError(e.message); setLoading(false) }
    else window.location.href = '/feed'
  }

  return (
    <div className="min-h-screen bg-[#0D0D14] flex">

      {/* Left quote panel */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center px-16 border-r border-[#2D2D42] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 to-transparent"></div>
        <div className="relative text-center">
          <p className="text-[#475569] text-5xl font-light mb-3">"</p>
          <p className="text-[#E2E8F0] text-xl font-light leading-relaxed mb-6 max-w-xs">
            Your identity stays hidden.<br/>Your words stay forever.
          </p>
          <div className="w-12 h-px bg-[#7C3AED] mx-auto"></div>
          <p className="text-[#C4B5FD] text-xs tracking-widest mt-4 uppercase">GYABUSKI</p>
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-full max-w-sm">

          <div className="text-center mb-10">
            <Link href="/" className="text-[#94A3B8] text-xs hover:text-white transition-colors mb-6 block">← Back to home</Link>
            <h1 className="text-white text-2xl font-light mb-2">Welcome back</h1>
            <p className="text-[#94A3B8] text-sm">Sign in to continue</p>
          </div>

          <button onClick={handleGoogle} disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white text-gray-800 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors mb-6 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#2D2D42]"></div>
            <span className="text-[#475569] text-xs">or</span>
            <div className="flex-1 h-px bg-[#2D2D42]"></div>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <input type="email" placeholder="Username or email" value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#13131E] border border-[#2D2D42] rounded-xl px-4 py-3 text-[#E2E8F0] text-sm placeholder-[#475569] outline-none focus:border-[#7C3AED] transition-colors"
            />
            <div className="relative">
              <input type={showPw ? 'text' : 'password'} placeholder="Password" value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleEmail()}
                className="w-full bg-[#13131E] border border-[#2D2D42] rounded-xl px-4 py-3 text-[#E2E8F0] text-sm placeholder-[#475569] outline-none focus:border-[#7C3AED] transition-colors pr-10"
              />
              <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#475569]">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-[#7C3AED]" />
              <span className="text-[#94A3B8] text-xs">Remember me</span>
            </label>
            <button className="text-[#7C3AED] text-xs hover:text-[#C4B5FD]">Forgot password?</button>
          </div>

          {error && <p className="text-[#EC4899] text-xs mb-4 text-center">{error}</p>}

          <button onClick={handleEmail} disabled={loading}
            className="w-full py-3 bg-[#7C3AED] hover:bg-[#6d28d9] text-white text-sm rounded-xl transition-colors mb-4 font-medium disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-[#94A3B8] text-xs mb-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#7C3AED] hover:text-[#C4B5FD]">Sign up</Link>
          </p>

          <div className="p-4 bg-[#13131E] border border-[#2D2D42] rounded-xl">
            <p className="text-[#475569] text-xs text-center leading-relaxed">
              Login is only to remember your space.<br/>Your identity stays hidden from everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}