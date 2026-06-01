'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Eye, Heart, Bookmark } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Post {
  id: string
  anon_id: string
  content: string
  title?: string | null
  mood_tag?: string | null
  views: number
  created_at: string
}

function timeAgo(d: string) {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

export default function PostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    async function load() {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()
      setPost(data as Post)
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0D0D14] flex flex-col items-center justify-center gap-4">
        <p className="text-[#94A3B8] text-sm">This whisper was not found.</p>
        <button onClick={() => router.push('/feed')} className="text-[#7C3AED] text-sm hover:underline">
          Back to feed
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D0D14] relative">

      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/backgrounds/background.jpeg)', opacity: 0.12 }}
      />
      <div className="fixed inset-0" style={{ background: 'rgba(13,13,20,0.93)' }} />

      <main className="relative z-10 max-w-2xl mx-auto px-6 py-12">

        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors mb-10 text-sm"
        >
          <ArrowLeft size={16} />
          Back to feed
        </button>

        {/* Post card */}
        <div
          className="rounded-2xl p-8"
          style={{ background: '#0f0f1a', border: '1px solid #2D2D42' }}
        >
          {/* Author + meta */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.4) 0%, #1a1a2e 100%)', border: '1px solid rgba(124,58,237,0.2)' }}
              >
                <span className="text-[#C4B5FD] text-xs font-bold">
                  {post.anon_id?.slice(0, 2).toUpperCase() || 'AN'}
                </span>
              </div>
              <div>
                <p className="text-[#C4B5FD] text-sm font-semibold">{post.anon_id || 'ANON'}</p>
                <p className="text-[#475569] text-xs">{timeAgo(post.created_at)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[#475569]">
              <Eye size={14} />
              <span className="text-xs">{post.views || 0}</span>
            </div>
          </div>

          {/* Mood tag */}
          {post.mood_tag && (
            <span
              className="inline-block px-3 py-1 rounded-full text-xs text-[#C4B5FD] mb-4"
              style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
            >
              {post.mood_tag}
            </span>
          )}

          {/* Title */}
          {post.title && (
            <h1 className="text-white text-2xl font-semibold mb-4 leading-snug">
              {post.title}
            </h1>
          )}

          {/* Content */}
          <p className="text-[#E2E8F0] text-base leading-8 whitespace-pre-wrap">
            {post.content}
          </p>

          {/* Reactions */}
          <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#2D2D42]">
            <span className="text-[#475569] text-xs">React</span>
            {['❤️', '😢', '😭', '🤝', '🔥'].map((emoji, i) => (
              <button key={i} className="text-lg hover:scale-125 transition-transform">
                {emoji}
              </button>
            ))}
            <button className="ml-auto text-[#475569] hover:text-[#C4B5FD] transition-colors">
              <Bookmark size={18} />
            </button>
          </div>
        </div>

      </main>
    </div>
  )
}