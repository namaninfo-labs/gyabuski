'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ArrowLeft, Eye, Heart, Bookmark, Calendar } from 'lucide-react'
import Link from 'next/link'
import { use } from 'react'

type Post = {
  id: string
  content: string
  anon_id: string
  created_at: string
  views: number
  mood_tag?: string
  title?: string
}

function timeAgo(d: string) {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000)
  if (s < 3600) return `${Math.floor(s / 60)} minutes ago`
  if (s < 86400) return `${Math.floor(s / 3600)} hours ago`
  return `${Math.floor(s / 86400)} days ago`
}

function getSession() {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem('gyabuski_session')
  if (!id) {
    id = Math.random().toString(36).slice(2)
    localStorage.setItem('gyabuski_session', id)
  }
  return id
}

const REACTIONS = [
  { emoji: '❤️', key: 'felt' },
  { emoji: '😢', key: 'sad' },
  { emoji: '😭', key: 'cry' },
  { emoji: '🤔', key: 'think' },
  { emoji: '🔥', key: 'fire' },
]

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [post, setPost] = useState<Post | null>(null)
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [myReaction, setMyReaction] = useState<string | null>(null)
  const [bookmarked, setBookmarked] = useState(false)
  const [totalReactions, setTotalReactions] = useState(0)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

      if (data) {
        setPost(data)
        const viewKey = `viewed_${id}`
        if (!sessionStorage.getItem(viewKey)) {
          await supabase
            .from('posts')
            .update({ views: (data.views || 0) + 1 })
            .eq('id', id)
          sessionStorage.setItem(viewKey, 'true')
        }
      }

      const { data: rxns } = await supabase
        .from('reactions')
        .select('reaction_type')
        .eq('post_id', id)

      if (rxns) {
        const c: Record<string, number> = {}
        rxns.forEach(r => {
          c[r.reaction_type] = (c[r.reaction_type] || 0) + 1
        })
        setCounts(c)
        setTotalReactions(rxns.length)
      }
    }
    load()
  }, [id])

  async function react(key: string) {
    if (myReaction) return
    await supabase.from('reactions').insert([{
      post_id: id,
      reaction_type: key,
      session_id: getSession(),
    }])
    setCounts(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }))
    setTotalReactions(t => t + 1)
    setMyReaction(key)
  }

  if (!post) return (
    <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center">
      <div
        className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: '#7C3AED', borderTopColor: 'transparent' }}
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0D0D14] text-white">

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute"
          style={{
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative max-w-2xl mx-auto px-5 md:px-8 py-8">

        {/* Back */}
        <Link
          href="/feed"
          className="flex items-center gap-2 text-sm mb-10 transition-colors"
          style={{ color: '#94A3B8' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={e => (e.currentTarget.style.color = '#94A3B8')}
        >
          <ArrowLeft size={16} />
          Back to feed
        </Link>

        {/* Author block */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #2D2D42, #1a1a2e)',
                border: '1px solid #2D2D42',
              }}
            >
              <div
                className="w-5 h-5 rounded-full"
                style={{ background: '#2D2D42' }}
              />
            </div>
            <div>
              <p
                className="font-mono text-sm font-semibold"
                style={{ color: '#C4B5FD' }}
              >
                {post.anon_id}
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#475569' }}>
                {timeAgo(post.created_at)}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="text-right">
            <div className="flex items-center gap-1.5 justify-end mb-1">
              <Eye size={13} style={{ color: '#94A3B8' }} />
              <span className="text-xs" style={{ color: '#94A3B8' }}>Read by</span>
            </div>
            <p className="text-white font-bold text-xl">
              {(post.views || 1) >= 1000
                ? `${((post.views || 1) / 1000).toFixed(1)}K`
                : post.views || 1}
            </p>
            <p className="text-xs" style={{ color: '#94A3B8' }}>people</p>
          </div>
        </div>

        {/* Mood tag */}
        {post.mood_tag && (
          <span
            className="inline-block text-xs px-3 py-1.5 rounded-full mb-6"
            style={{
              background: '#13131E',
              border: '1px solid #2D2D42',
              color: '#C4B5FD',
            }}
          >
            {post.mood_tag}
          </span>
        )}

        {/* Title if exists */}
        {post.title && (
          <h1
            className="text-2xl font-semibold mb-4"
            style={{ color: '#FFFFFF' }}
          >
            {post.title}
          </h1>
        )}

        {/* Quote mark + content */}
        <div className="mb-10">
          <span
            className="text-4xl leading-none select-none"
            style={{
              color: '#7C3AED',
              fontFamily: 'Georgia, serif',
            }}
          >
            "
          </span>
          <p
            className="text-lg leading-9 whitespace-pre-line mt-2"
            style={{
              color: '#E2E8F0',
              fontFamily: 'Georgia, serif',
            }}
          >
            {post.content}
          </p>
        </div>

        {/* Stats row */}
        <div
          className="flex items-center gap-6 text-xs mb-8 pb-8"
          style={{
            borderBottom: '1px solid #2D2D42',
            color: '#94A3B8',
          }}
        >
          <div className="flex items-center gap-1.5">
            <Heart size={13} />
            <span>{totalReactions} reactions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={13} />
            <span>Published {timeAgo(post.created_at)}</span>
          </div>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="ml-auto flex items-center gap-1.5 transition-colors"
            style={{ color: bookmarked ? '#7C3AED' : '#94A3B8' }}
          >
            <Bookmark
              size={15}
              fill={bookmarked ? '#7C3AED' : 'none'}
            />
          </button>
        </div>

        {/* Reactions */}
        <div className="mb-4">
          <p className="text-xs mb-4" style={{ color: '#94A3B8' }}>
            You&apos;ve read this. How do you feel?
          </p>
          <div className="flex flex-wrap gap-2">
            {REACTIONS.map(r => (
              <button
                key={r.key}
                onClick={() => react(r.key)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all"
                style={{
                  background: myReaction === r.key
                    ? 'rgba(124,58,237,0.15)'
                    : '#13131E',
                  border: `1px solid ${myReaction === r.key ? 'rgba(124,58,237,0.5)' : '#2D2D42'}`,
                  color: myReaction === r.key ? '#C4B5FD' : '#94A3B8',
                  opacity: myReaction && myReaction !== r.key ? 0.5 : 1,
                  cursor: myReaction ? 'default' : 'pointer',
                }}
              >
                <span className="text-lg">{r.emoji}</span>
                <span>{counts[r.key] || 0}</span>
              </button>
            ))}
          </div>

          {myReaction && (
            <p className="text-xs mt-3" style={{ color: '#475569' }}>
              Your reaction has been silently recorded.
            </p>
          )}
        </div>

      </div>
    </div>
  )
}