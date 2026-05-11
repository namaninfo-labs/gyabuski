'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Eye, Bookmark } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'

type Post = { id:string; content:string; anon_id:string; created_at:string; views:number; mood_tag?:string }

function timeAgo(d: string) {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s/60)} minutes ago`
  if (s < 86400) return `${Math.floor(s/3600)} hours ago`
  return `${Math.floor(s/86400)} days ago`
}

function getSession() {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('gyabuski_session')
  if (!id) { id = Math.random().toString(36).slice(2); localStorage.setItem('gyabuski_session', id) }
  return id
}

const REACTIONS = [
  { emoji:'❤️', label:'I felt this', key:'felt' },
  { emoji:'😢', label:'I cried', key:'sad' },
  { emoji:'🤝', label:'Same here', key:'same' },
  { emoji:'🔥', label:'Powerful', key:'fire' },
  { emoji:'💜', label:'You are heard', key:'heard' },
]

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [post, setPost] = useState<Post | null>(null)
  const [counts, setCounts] = useState<Record<string,number>>({})
  const [myReaction, setMyReaction] = useState<string|null>(null)

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('posts').select('*').eq('id', id).single()
      if (data) {
        setPost(data)
        await supabase.from('posts').update({ views: (data.views||0)+1 }).eq('id', id)
      }
      const { data: rxns } = await supabase.from('reactions').select('reaction_type').eq('post_id', id)
      if (rxns) {
        const c: Record<string,number> = {}
        rxns.forEach(r => { c[r.reaction_type] = (c[r.reaction_type]||0)+1 })
        setCounts(c)
      }
    }
    load()
  }, [id])

  async function react(key: string) {
    if (myReaction) return
    await supabase.from('reactions').insert([{ post_id: id, reaction_type: key, session_id: getSession() }])
    setCounts(prev => ({ ...prev, [key]: (prev[key]||0)+1 }))
    setMyReaction(key)
  }

  if (!post) return (
    <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center">
      <p className="text-[#475569] font-mono text-xs">finding this feeling...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0D0D14] text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-purple-900/6 blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-6 py-10">

        <Link href="/feed" className="flex items-center gap-2 text-[#94A3B8] hover:text-white text-sm mb-12 transition-colors">
          <ArrowLeft size={16} /> Back to feed
        </Link>

        {/* Author */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-[#2D2D42]"></div>
            <div>
              <p className="text-[#C4B5FD] font-mono text-sm font-semibold">{post.anon_id}</p>
              <p className="text-[#475569] text-xs">{timeAgo(post.created_at)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[#94A3B8]">
              <Eye size={14} />
              <span className="text-white font-bold">{post.views||0}</span>
              <span className="text-[#94A3B8] text-xs">reads</span>
            </div>
            <button className="text-[#475569] hover:text-[#94A3B8] transition-colors">
              <Bookmark size={16} />
            </button>
          </div>
        </div>

        {/* Mood tag */}
        {post.mood_tag && (
          <span className="inline-block bg-[#1E1E30] border border-[#2D2D42] text-[#C4B5FD] text-xs px-3 py-1 rounded-full mb-6">
            {post.mood_tag}
          </span>
        )}

        {/* Content */}
        <p className="text-[#E2E8F0] text-lg leading-9 whitespace-pre-line mb-14">
          {post.content}
        </p>

        {/* Reactions */}
        <div className="border-t border-[#2D2D42] pt-8">
          <p className="text-[#94A3B8] text-xs mb-4">React to this feeling</p>
          <div className="flex flex-wrap gap-2">
            {REACTIONS.map(r => (
              <button
                key={r.key}
                onClick={() => react(r.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all ${
                  myReaction === r.key
                    ? 'bg-[#7C3AED]/20 border border-[#7C3AED]/50 text-[#C4B5FD]'
                    : 'bg-[#13131E] border border-[#2D2D42] text-[#94A3B8] hover:border-[#7C3AED]/50 hover:text-white'
                } ${myReaction && myReaction !== r.key ? 'opacity-50' : ''}`}
              >
                <span className="text-lg">{r.emoji}</span>
                <span>{r.label}</span>
                {counts[r.key] > 0 && (
                  <span className="text-xs text-[#94A3B8]">{counts[r.key]}</span>
                )}
              </button>
            ))}
          </div>
          {myReaction && (
            <p className="text-[#475569] text-xs mt-4">Your reaction has been silently recorded.</p>
          )}
        </div>

      </div>
    </div>
  )
}