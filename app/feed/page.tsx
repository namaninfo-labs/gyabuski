'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { fetchLatest, fetchTrending, fetchMostLiked, type Post } from '@/lib/feedUtils'
import Link from 'next/link'
import { Eye, Heart, Bookmark, MoreHorizontal } from 'lucide-react'

function timeAgo(d: string) {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000)
  if (s < 60) return 'just now'
  if (s < 3600) return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

function PostSkeleton() {
  return (
    <div className="border-b border-[#2D2D42] px-5 md:px-8 py-6">
      <div className="flex gap-4">
        <div className="skeleton w-12 h-12 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <div className="skeleton h-2.5 w-20 mb-3 rounded" />
          <div className="skeleton h-4 w-full mb-2 rounded" />
          <div className="skeleton h-4 w-4/5 mb-2 rounded" />
          <div className="skeleton h-4 w-3/5 rounded" />
        </div>
        <div className="hidden md:block text-right">
          <div className="skeleton h-6 w-12 mb-1 rounded ml-auto" />
          <div className="skeleton h-2.5 w-10 rounded ml-auto" />
        </div>
      </div>
    </div>
  )
}

const REACTIONS = ['❤️', '😢', '😭', '🤔', '🔥']

function FeedContent() {
  const searchParams = useSearchParams()
  const mood = searchParams.get('mood')
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('Latest')
  const [souls, setSouls] = useState(134)

  // Fix: Math.random hydration error
  useEffect(() => {
    setSouls(Math.floor(Math.random() * 80) + 90)
  }, [])

  useEffect(() => {
    async function load() {
      setLoading(true)
      let result: Post[] = []
      if (tab === 'Latest') result = await fetchLatest()
      else if (tab === 'Trending') result = await fetchTrending()
      else result = await fetchMostLiked()

      if (mood && mood !== 'All') {
        result = result.filter(p => p.mood_tag === mood)
      }

      setPosts(result)
      setLoading(false)
    }
    load()
  }, [tab, mood])

  return (
    <div className="min-h-screen bg-[#0D0D14]">

      {/* Page header */}
      <div className="border-b border-[#2D2D42] px-5 md:px-8 py-5">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-white text-3xl font-bold">Feed</h1>
            <p className="text-[#94A3B8] text-sm mt-1">Real thoughts. Hidden identities.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[#94A3B8] text-xs pb-1">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-green" />
            {souls} souls here right now
          </div>
        </div>

        {/* Active mood filter badge */}
        {mood && mood !== 'All' && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[#475569] text-xs">Filtering by:</span>
            <Link
              href="/feed"
              className="flex items-center gap-1.5 px-3 py-1 bg-[#7C3AED]/15 border border-[#7C3AED]/30 rounded-full text-[#C4B5FD] text-xs hover:bg-[#7C3AED]/25 transition-colors"
            >
              {mood} ✕
            </Link>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2D2D42] px-5 md:px-8">
        {['Latest', 'Trending', 'Most Liked'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`py-3.5 px-1 mr-8 text-sm border-b-2 -mb-px transition-all ${
              tab === t
                ? 'text-white border-[#7C3AED] font-semibold'
                : 'text-[#94A3B8] border-transparent hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div className="max-w-3xl">
        {loading ? (
          <>{[1, 2, 3, 4].map(i => <PostSkeleton key={i} />)}</>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center px-8">
            <p className="text-[#94A3B8] text-sm mb-2">
              {mood ? `No ${mood} stories yet.` : 'The archive is empty.'}
            </p>
            <p className="text-[#475569] text-xs mb-6">Be the first to leave something behind.</p>
            <Link
              href="/write"
              className="px-5 py-2.5 bg-[#7C3AED] text-white text-sm rounded-xl hover:bg-[#6d28d9] transition-colors"
            >
              Write something
            </Link>
          </div>
        ) : (
          posts.map(post => (
            <article
              key={post.id}
              className="border-b border-[#2D2D42] px-5 md:px-8 py-6 hover:bg-[#13131E]/40 transition-colors group"
            >
              <div className="flex gap-4">

                {/* Avatar + ID */}
                <div className="flex flex-col items-center flex-shrink-0 w-16 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C3AED]/30 to-[#1a1a2e] border border-[#2D2D42] flex items-center justify-center mb-2">
                    <span className="text-[#C4B5FD] text-xs font-bold">
                      {post.anon_id?.slice(0, 2).toUpperCase() || 'AN'}
                    </span>
                  </div>
                  <p className="text-[#C4B5FD] font-mono text-[9px] leading-tight break-all">
                    {post.anon_id}
                  </p>
                  <p className="text-[#475569] text-[9px] mt-0.5">{timeAgo(post.created_at)}</p>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">

                  {/* Mood tag */}
                  {post.mood_tag && (
                    <span className="inline-block text-[#7C3AED] text-[10px] mb-2">
                      ● {post.mood_tag}
                    </span>
                  )}

                  {/* Title if exists */}
                  {post.title && (
                    <h2 className="text-white font-semibold text-base mb-1 leading-snug">
                      {post.title}
                    </h2>
                  )}

                  <p className="text-[#E2E8F0] text-[15px] leading-7 line-clamp-4 mb-3">
                    {post.content}
                  </p>

                  <Link
                    href={`/post/${post.id}`}
                    className="inline-flex items-center gap-1 text-[#7C3AED] text-xs border border-[#7C3AED]/40 px-3 py-1.5 rounded-full hover:bg-[#7C3AED]/10 transition-all mb-4"
                  >
                    Read More →
                  </Link>

                  {/* Reactions */}
                  <div className="flex items-center gap-3">
                    <span className="text-[#94A3B8] text-xs">React</span>
                    {REACTIONS.map((emoji, i) => (
                      <button
                        key={i}
                        className="text-base hover:scale-125 transition-transform active:scale-110"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stats — right side */}
                <div className="hidden md:flex flex-col items-end justify-between flex-shrink-0 ml-2">
                  <button className="text-[#475569] hover:text-[#94A3B8] transition-colors opacity-0 group-hover:opacity-100">
                    <MoreHorizontal size={16} />
                  </button>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end mb-0.5">
                      <Eye size={13} className="text-[#94A3B8]" />
                      <span className="text-white font-bold text-lg">
                        {post.views >= 1000
                          ? `${(post.views / 1000).toFixed(1)}K`
                          : post.views || 0}
                      </span>
                    </div>
                    <p className="text-[#94A3B8] text-[10px]">people</p>
                    <div className="flex items-center gap-1 justify-end mt-2">
                      <Heart size={12} className="text-[#94A3B8]" />
                      <span className="text-[#94A3B8] text-xs">0 reactions</span>
                    </div>
                  </div>
                  <button className="text-[#475569] hover:text-[#C4B5FD] transition-colors mt-2">
                    <Bookmark size={15} />
                  </button>
                </div>

              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}

export default function FeedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0D0D14]" />}>
      <FeedContent />
    </Suspense>
  )
}