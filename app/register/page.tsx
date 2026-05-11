'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { generateAnonId } from '@/lib/generateId'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [generatedId, setGeneratedId] = useState(generateAnonId())

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider:'google',
      options:{ redirectTo:`${window.location.origin}/auth/callback` }
    })
  }

  async function handleRegister() {
    if (!email || !password) return
    setLoading(true); setError('')
    const { data, error:e } = await supabase.auth.signUp({ email, password })
    if (e) { setError(e.message); setLoading(false); return }
    if (data.user) {
      await supabase.from('profiles').insert([{ id:data.user.id, anon_id:generatedId }])
      setDone(true)
    }
    setLoading(false)
  }

  if (done) return (
    <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <h2 className="text-white text-2xl font-light mb-3">Check your email</h2>
        <p className="text-[#94A3B8] text-sm mb-4">Confirm your email to activate your space.</p>
        <div className="bg-[#13131E] border border-[#2D2D42] rounded-xl p-4 mb-6">
          <p className="text-[#475569] text-xs mb-1">Your anonymous identity</p>
          <p className="text-[#C4B5FD] font-mono text-lg">{generatedId}</p>
        </div>
        <Link href="/login" className="text-[#7C3AED] text-sm">Back to login</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0D0D14] flex">
      <div className="hidden lg:flex flex-1 items-center justify-center px-16 border-r border-[#2D2D42] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 to-transparent"></div>
        <div className="relative text-center">
          <h1 className="font-bold text-4xl tracking-[0.3em] text-white mb-3">GYABUSKI</h1>
          <p className="text-[#C4B5FD] text-xs tracking-widest uppercase mb-8">anonymous emotional archive</p>
          <p className="text-[#94A3B8] text-lg font-light leading-relaxed max-w-xs">Create your space.<br/>Your identity will remain hidden.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <h2 className="text-white text-2xl font-light mb-2">Create your space</h2>
            <p className="text-[#94A3B8] text-sm">Your identity will remain hidden.</p>
          </div>

          <button onClick={handleGoogle} className="w-full flex items-center justify-center gap-3 py-3 bg-white text-gray-800 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors mb-6">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[#2D2D42]"></div><span className="text-[#475569] text-xs">or</span><div className="flex-1 h-px bg-[#2D2D42]"></div>
          </div>

          <div className="flex flex-col gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 bg-[#13131E] border border-[#2D2D42] rounded-xl px-4 py-3 mb-1">
                <span className="text-[#C4B5FD] font-mono text-sm">{generatedId}</span>
                <button onClick={() => setGeneratedId(generateAnonId())} className="ml-auto text-[#475569] hover:text-[#94A3B8] text-xs">Regenerate</button>
              </div>
              <p className="text-[#475569] text-xs px-1">This is your anonymous identity</p>
            </div>
            <input type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#13131E] border border-[#2D2D42] rounded-xl px-4 py-3 text-[#E2E8F0] text-sm placeholder-[#475569] outline-none focus:border-[#7C3AED] transition-colors" />
            <input type="password" placeholder="Password (min 8 chars)" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#13131E] border border-[#2D2D42] rounded-xl px-4 py-3 text-[#E2E8F0] text-sm placeholder-[#475569] outline-none focus:border-[#7C3AED] transition-colors" />
          </div>

          {error && <p className="text-[#EC4899] text-xs mb-4">{error}</p>}

          <button onClick={handleRegister} disabled={loading}
            className="w-full py-3 bg-[#7C3AED] hover:bg-[#6d28d9] text-white text-sm rounded-xl transition-colors mb-4 font-medium disabled:opacity-50"
          >{loading ? 'Creating...' : 'Create account'}</button>

          <p className="text-center text-[#94A3B8] text-xs">
            Already have an account?{' '}<Link href="/login" className="text-[#7C3AED]">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}