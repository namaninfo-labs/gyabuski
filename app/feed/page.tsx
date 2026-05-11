'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Eye, BookmarkPlus, MoreHorizontal } from 'lucide-react'
import { fetchLatest, fetchTrending, fetchMostLiked, type Post } from '@/lib/feedUtils'

function timeAgo(d: string) {
  const seconds = Math.floor((Date.now() - new Date(d).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

function PostSkeleton() {
  return (
    <div className="border-b border-[#2D2D42] px-6 py-6">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-full bg-[#1A1A2E] animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-3 w-28 bg-[#1A1A2E] rounded animate-pulse" />
          <div className="h-5 w-full bg-[#1A1A2E] rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-[#1A1A2E] rounded animate-pulse" />
          <div className="h-4 w-1/2 bg-[#1A1A2E] rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}

const REACTIONS = ['❤️', '😢', '😭', '🤝', '🔥']
const MOOD_FILTERS = ['All', 'Sad', 'Lonely', 'Anxious', 'Hopeful', 'Angry', 'Grateful', 'Confused', 'Tired', 'Calm']

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('Latest')
  const [moodFilter, setMoodFilter] = useState('All')

  // FIX: Math.random() hydration error — server pe fixed value, client pe useEffect mein random
  const [souls, setSouls] = useState(134)
  useEffect(() => {
    setSouls(Math.floor(Math.random() * 80) + 100)
  }, [])

  useEffect(() => {
    async function load() {
      setLoading(true)

      // FIX: let result declare kiya — pehle missing tha
      let result: Post[] = []

      if (activeTab === 'Latest') {
        result = await fetchLatest()
      } else if (activeTab === 'Trending') {
        result = await fetchTrending()
      } else {
        result = await fetchMostLiked()
      }

      if (moodFilter !== 'All') {
        result = result.filter((p) => p.mood_tag === moodFilter)
      }

      setPosts(result)
      setLoading(false)
    }
    load()
  }, [activeTab, moodFilter])

  return (
    <div className="min-h-screen bg-[#0D0D14]">

      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0D0D14]/95 backdrop-blur-sm border-b border-[#2D2D42] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white font-bold text-2xl tracking-tight">Feed</h1>
            <p className="text-[#94A3B8] text-sm mt-0.5">Real thoughts. Hidden identities.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-green inline-block" />
            <span className="text-[#94A3B8] text-xs">{souls} souls here right now</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-0">
            {['Latest', 'Trending', 'Most Liked'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
                  activeTab === tab
                    ? 'text-white border-[#7C3AED]'
                    : 'text-[#94A3B8] border-transparent hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Mood filter dropdown */}
          <select
            value={moodFilter}
            onChange={(e) => setMoodFilter(e.target.value)}
            className="bg-[#13131E] border border-[#2D2D42] text-[#94A3B8] text-xs rounded-lg px-3 py-1.5 outline-none focus:border-[#7C3AED] cursor-pointer"
          >
            {MOOD_FILTERS.map((m) => (
              <option key={m} value={m}>{m === 'All' ? 'All Posts' : m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Mood pill scroll */}
      <div className="flex gap-2 px-6 py-3 overflow-x-auto border-b border-[#2D2D42]">
        {MOOD_FILTERS.map((mood) => (
          <button
            key={mood}
            onClick={() => setMoodFilter(mood)}
            className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
              moodFilter === mood
                ? 'bg-[#7C3AED] text-white'
                : 'bg-[#13131E] text-[#94A3B8] border border-[#2D2D42] hover:border-[#7C3AED] hover:text-white'
            }`}
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Feed cards */}
      <div className="max-w-2xl mx-auto">
        {loading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-[#475569] text-4xl mb-4">✦</p>
            <p className="text-[#94A3B8] text-base">No whispers here yet.</p>
            <p className="text-[#475569] text-sm mt-1">Be the first to write something.</p>
            <Link
              href="/write"
              className="mt-6 px-5 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm hover:bg-[#6d28d9] transition-colors"
            >
              Write something
            </Link>
          </div>
        ) : (
          posts.map((post, i) => (
            <article
              key={post.id}
              className="border-b border-[#2D2D42] px-6 py-6 hover:bg-[#13131E]/40 transition-colors group animate-fade-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {/* Author row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#7C3AED]/40 to-[#1A1A2E] border border-[#2D2D42] flex items-center justify-center">
                      <span className="text-[#C4B5FD] text-xs font-bold">
                        {post.anon_id?.slice(0, 2).toUpperCase() || 'AN'}
                      </span>
                    </div>
                    {i < 3 && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#7C3AED] border-2 border-[#0D0D14]" />
                    )}
                  </div>
                  <div>
                    <p className="text-[#C4B5FD] text-sm font-semibold">
                      {post.anon_id || 'ANON'}
                    </p>
                    <p className="text-[#475569] text-xs">{timeAgo(post.created_at)}</p>
                  </div>
                </div>
                <button className="text-[#475569] hover:text-[#94A3B8] transition-colors opacity-0 group-hover:opacity-100">
                  <MoreHorizontal size={16} />
                </button>
              </div>

              {/* Title */}
              {post.title && (
                <h2 className="text-white font-semibold text-lg mb-2 leading-snug">
                  {post.title}
                </h2>
              )}

              {/* Content */}
              <p className="text-[#E2E8F0] text-sm leading-relaxed line-clamp-4 mb-3">
                {post.content}
              </p>

              {/* Mood tag */}
              {post.mood_tag && (
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#C4B5FD] text-xs mb-3">
                  {post.mood_tag}
                </span>
              )}

              {/* Read more */}
              <Link
                href={`/post/${post.id}`}
                className="inline-flex items-center gap-1 text-[#7C3AED] text-sm border border-[#7C3AED]/30 rounded-full px-3 py-1 hover:bg-[#7C3AED]/10 transition-all mb-4"
              >
                Read More →
              </Link>

              {/* Bottom row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-[#475569] text-xs mr-2">React</span>
                  {REACTIONS.map((emoji, idx) => (
                    <button
                      key={idx}
                      className="px-2 py-1 rounded-lg hover:bg-[#1A1A2E] transition-all text-sm"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#475569]">
                    <Eye size={13} />
                    <span className="text-xs">
                      {post.views > 999
                        ? `${(post.views / 1000).toFixed(1)}K`
                        : post.views || 0}
                    </span>
                  </div>
                  <button className="text-[#475569] hover:text-[#C4B5FD] transition-colors">
                    <BookmarkPlus size={15} />
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