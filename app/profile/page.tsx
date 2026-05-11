'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [tab, setTab] = useState('My Stories')

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      if (p) setProfile(p)
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-[#0D0D14] text-white">
      <div className="max-w-2xl mx-auto px-6 py-10">

        {!profile ? (
          <div className="text-center py-20">
            <p className="text-[#94A3B8] mb-4">Sign in to see your profile.</p>
            <Link href="/login" className="px-5 py-2.5 bg-[#7C3AED] text-white text-sm rounded-xl">Sign in</Link>
          </div>
        ) : (
          <>
            {/* Avatar + info */}
            <div className="flex items-center gap-5 mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-800 to-indigo-900 border border-[#2D2D42] flex items-center justify-center text-2xl">◎</div>
              <div>
                <h1 className="text-white font-bold text-xl font-mono">{profile.anon_id}</h1>
                <p className="text-[#94A3B8] text-xs mt-1">Member since {new Date(profile.created_at).toLocaleDateString('en-IN', { month:'long', year:'numeric' })}</p>
                <p className="text-[#C4B5FD] text-sm italic mt-1">Silence is my language.</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mb-8 pb-8 border-b border-[#2D2D42]">
              {[{ label:'Stories', count:0 },{ label:'Likes Received', count:0 },{ label:'Bookmarks', count:0 }].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-white font-bold text-2xl">{s.count}</p>
                  <p className="text-[#94A3B8] text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-0 border-b border-[#2D2D42] mb-6">
              {['My Stories','Liked','Bookmarks','Drafts'].map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`py-3 px-4 text-sm transition-all border-b-2 -mb-px ${
                    tab === t ? 'text-white border-[#7C3AED] font-semibold' : 'text-[#94A3B8] border-transparent'
                  }`}
                >{t}</button>
              ))}
            </div>

            <div className="text-center py-12">
              <p className="text-[#475569] text-sm">Nothing here yet.</p>
              <Link href="/write" className="inline-block mt-4 px-4 py-2 border border-[#2D2D42] text-[#94A3B8] text-xs rounded-xl hover:bg-[#13131E] transition-colors">
                Start writing
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}