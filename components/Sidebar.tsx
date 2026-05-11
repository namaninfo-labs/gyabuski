'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { BookOpen, Pen, Bookmark, User, FileText, Clock, Settings, LogOut, Home } from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [anonId, setAnonId] = useState<string|null>(null)

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase.from('profiles').select('anon_id').eq('id', user.id).single()
        if (data) setAnonId(data.anon_id)
      }
    }
    getProfile()
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  const active = (href: string) => pathname === href

  return (
    <aside className="hidden md:flex flex-col w-[220px] min-h-screen bg-[#181825] border-r border-[#2D2D42] px-4 py-6 fixed top-0 left-0 z-50">

      {/* Logo */}
      <Link href="/" className="mb-8 block">
        <h1 className="text-white font-bold text-lg tracking-[0.3em]" style={{fontFamily:'Inter,sans-serif'}}>GYABUSKI</h1>
        <p className="text-[#C4B5FD] text-[9px] tracking-[0.3em] mt-1 uppercase">anonymous emotional archive</p>
      </Link>

      {/* Explore */}
      <div className="mb-6">
        <p className="text-[#475569] text-[9px] tracking-[0.2em] uppercase mb-3 px-2">Explore</p>
        <div className="flex flex-col gap-1">
          {[
            { href:'/feed', icon:BookOpen, label:'Read', sub:'anonymous stories' },
            { href:'/write', icon:Pen, label:'Write', sub:'share your thoughts' },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all border ${
                active(item.href)
                  ? 'bg-[#7C3AED]/15 text-[#C4B5FD] border-[#7C3AED]/20'
                  : 'text-[#94A3B8] border-transparent hover:bg-[#13131E] hover:text-white'
              }`}
            >
              <item.icon size={16} className="flex-shrink-0" />
              <div>
                <p className="text-sm font-medium leading-tight">{item.label}</p>
                <p className="text-[9px] text-[#475569] mt-0.5">{item.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div className="mb-6">
        <p className="text-[#475569] text-[9px] tracking-[0.2em] uppercase mb-3 px-2">Quick Access</p>
        <div className="flex flex-col gap-0.5">
          {[
            { label:'Latest Whispers', href:'/feed', dot:true },
            { label:'Most Liked', href:'/feed?sort=liked' },
            { label:'Trending', href:'/feed?sort=trending' },
            { label:'Bookmarks', href:'/bookmarks' },
            { label:'My Stories', href:'/my-stories' },
          ].map(item => (
            <Link key={item.label} href={item.href}
              className="flex items-center justify-between text-[#94A3B8] text-sm px-3 py-1.5 rounded-lg hover:text-white hover:bg-[#13131E] transition-all"
            >
              <span>{item.label}</span>
              {item.dot && <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]"></span>}
            </Link>
          ))}
        </div>
      </div>

      {/* Your Space */}
      <div className="mb-6">
        <p className="text-[#475569] text-[9px] tracking-[0.2em] uppercase mb-3 px-2">Your Space</p>
        <div className="flex flex-col gap-0.5">
          {[
            { label:'Drafts', href:'/drafts', icon:FileText },
            { label:'History', href:'/history', icon:Clock },
            { label:'Settings', href:'/settings', icon:Settings },
          ].map(item => (
            <Link key={item.label} href={item.href}
              className="flex items-center gap-2 text-[#94A3B8] text-sm px-3 py-1.5 rounded-lg hover:text-white hover:bg-[#13131E] transition-all"
            >
              <item.icon size={14} /> {item.label}
            </Link>
          ))}
          {anonId && (
            <button onClick={logout}
              className="flex items-center gap-2 text-[#94A3B8] text-sm px-3 py-1.5 rounded-lg hover:text-red-400 hover:bg-[#13131E] transition-all text-left"
            >
              <LogOut size={14} /> Logout
            </button>
          )}
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-auto">
        <div className="rounded-xl p-3 border border-[#2D2D42] bg-[#13131E]">
          {anonId ? (
            <>
              <p className="text-[#475569] text-[9px] tracking-widest uppercase mb-1">Your identity</p>
              <p className="text-[#C4B5FD] font-mono text-sm">{anonId}</p>
              <div className="w-6 h-px bg-[#7C3AED] mt-2"></div>
            </>
          ) : (
            <>
              <p className="text-[#475569] text-[11px] italic leading-relaxed">
                "This is your space.<br/>No identity.<br/>Only honesty."
              </p>
              <div className="w-6 h-px bg-[#7C3AED] mt-2 mb-2"></div>
              <Link href="/login" className="text-[#7C3AED] text-xs hover:text-[#C4B5FD] transition-colors">
                Sign in to save your space →
              </Link>
            </>
          )}
        </div>
      </div>

    </aside>
  )
}