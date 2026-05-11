'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import {
  Eye,
  BookmarkPlus,
} from 'lucide-react'

import {
  fetchLatest,
  fetchTrending,
  fetchMostLiked,
  type Post,
} from '@/lib/feedUtils'

function timeAgo(d: string) {

  const seconds = Math.floor(
    (Date.now() - new Date(d).getTime()) / 1000
  )

  if (seconds < 60) return 'just now'

  if (seconds < 3600) {
    return `${Math.floor(seconds / 60)}m ago`
  }

  if (seconds < 86400) {
    return `${Math.floor(seconds / 3600)}h ago`
  }

  return `${Math.floor(seconds / 86400)}d ago`
}

function PostSkeleton() {

  return (
    <div className="border-b border-[#2D2D42] px-5 py-5">

      <div className="flex gap-4">

        <div className="w-14 h-14 rounded-full bg-[#1A1A2E] animate-pulse flex-shrink-0" />

        <div className="flex-1">

          <div className="h-3 w-24 bg-[#1A1A2E] rounded mb-3 animate-pulse" />

          <div className="h-4 w-full bg-[#1A1A2E] rounded mb-2 animate-pulse" />

          <div className="h-4 w-3/4 bg-[#1A1A2E] rounded animate-pulse" />

        </div>

      </div>

    </div>
  )
}

export default function FeedPage() {

  const [posts, setPosts] = useState<Post[]>([])

  const [loading, setLoading] = useState(true)

  const [activeTab, setActiveTab] =
    useState('Latest')

  const [souls] = useState(
    Math.floor(Math.random() * 80) + 60
  )

  // Mood filters
  const MOOD_FILTERS = [
    'All',
    'Sad',
    'Lonely',
    'Anxious',
    'Hopeful',
    'Angry',
    'Grateful',
    'Confused',
    'Tired',
    'Calm',
  ]

  const [moodFilter, setMoodFilter] =
    useState('All')

  useEffect(() => {

    async function load() {

      setLoading(true)

      let result: Post[] = []

      if (activeTab === 'Latest') {

        result = await fetchLatest()

      } else if (activeTab === 'Trending') {

        result = await fetchTrending()

      } else {

        result = await fetchMostLiked()
      }

      // Mood filtering
      if (moodFilter !== 'All') {

        result = result.filter(
          (p) => p.mood_tag === moodFilter
        )
      }

      setPosts(result)

      setLoading(false)
    }

    load()

  }, [activeTab, moodFilter])

  const reactions = [
    '❤️',
    '😢',
    '😭',
    '🤝',
    '🔥',
  ]

  return (
    <div className="min-h-screen bg-[#0D0D14]">

      {/* Header */}
      <div className="
        sticky top-0 z-10
        bg-[#0D0D14]/95
        backdrop-blur-sm
        border-b border-[#2D2D42]
        px-5 py-4
        flex items-center justify-between
      ">

        <div>

          <h1 className="text-white text-2xl font-bold">
            Feed
          </h1>

          <p className="text-[#94A3B8] text-xs mt-1">
            Real thoughts. Hidden identities.
          </p>

        </div>

        <div className="flex items-center gap-2">

          <span className="
            w-2 h-2 rounded-full
            bg-[#10B981]
            animate-pulse
          " />

          <span className="text-[#94A3B8] text-xs">
            {souls} souls here right now
          </span>

        </div>

      </div>

      {/* Tabs */}
      <div className="
        flex border-b border-[#2D2D42]
        px-5
      ">

        {[
          'Latest',
          'Trending',
          'Most Liked',
        ].map((tab) => (

          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              py-3 px-4 text-sm
              transition-all
              border-b-2 -mb-px
              ${
                activeTab === tab
                  ? 'text-white border-[#7C3AED] font-semibold'
                  : 'text-[#94A3B8] border-transparent hover:text-white'
              }
            `}
          >
            {tab}
          </button>

        ))}

      </div>

      {/* Mood Filters */}
      <div className="
        flex gap-2
        px-5 py-3
        overflow-x-auto
        border-b border-[#2D2D42]
      ">

        {MOOD_FILTERS.map((m) => (

          <button
            key={m}
            onClick={() => setMoodFilter(m)}
            className={`
              flex-shrink-0
              px-3 py-1
              rounded-full
              text-xs
              transition-all
              ${
                moodFilter === m
                  ? 'bg-[#7C3AED] text-white'
                  : 'bg-[#13131E] text-[#94A3B8] border border-[#2D2D42]'
              }
            `}
          >
            {m}
          </button>

        ))}

      </div>

      {/* Feed */}
      <div className="max-w-2xl">

        {loading ? (

          <>
            {[1, 2, 3].map((i) => (
              <PostSkeleton key={i} />
            ))}
          </>

        ) : posts.length === 0 ? (

          <div className="
            flex flex-col items-center
            py-24 text-center px-8
          ">

            <div className="text-4xl mb-4">
              🌙
            </div>

            <p className="text-[#94A3B8] text-sm mb-2">
              The archive is empty.
            </p>

            <p className="text-[#475569] text-xs mb-6">
              Be the first to leave something behind.
            </p>

            <Link
              href="/write"
              className="
                px-5 py-2.5
                bg-[#7C3AED]
                text-white text-sm
                rounded-xl
                hover:bg-[#6d28d9]
                transition-colors
              "
            >
              Write something
            </Link>

          </div>

        ) : (

          posts.map((post) => (

            <div
              key={post.id}
              className="
                border-b border-[#2D2D42]
                px-5 py-5
                hover:bg-[#13131E]/50
                transition-colors
              "
            >

              <div className="flex gap-4">

                {/* Avatar */}
                <div className="
                  flex flex-col items-center
                  flex-shrink-0 w-14
                ">

                  <div className="
                    w-14 h-14 rounded-full
                    bg-gradient-to-br
                    from-zinc-700
                    to-zinc-900
                    border border-[#2D2D42]
                    flex items-center justify-center
                  ">

                    <div className="
                      w-6 h-6 rounded-full
                      bg-[#2D2D42]
                    " />

                  </div>

                  <p className="
                    text-[#C4B5FD]
                    text-[9px]
                    mt-2
                    text-center
                    font-mono
                    leading-tight
                  ">
                    {post.anon_id}
                  </p>

                  <p className="
                    text-[#475569]
                    text-[9px]
                    mt-0.5
                  ">
                    {timeAgo(post.created_at)}
                  </p>

                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">

                  {post.title && (
                    <h2 className="
                      text-white
                      text-lg
                      mb-2
                    ">
                      {post.title}
                    </h2>
                  )}

                  <p className="
                    text-[#E2E8F0]
                    text-sm
                    leading-7
                    line-clamp-4
                    mb-3
                  ">
                    {post.content}
                  </p>

                  {post.mood_tag && (
                    <div className="mb-3">
                      <span className="
                        px-2 py-1
                        rounded-full
                        text-[10px]
                        bg-[#1A1A2E]
                        border border-[#2D2D42]
                        text-[#C4B5FD]
                      ">
                        {post.mood_tag}
                      </span>
                    </div>
                  )}

                  <Link
                    href={`/post/${post.id}`}
                    className="
                      text-[#7C3AED]
                      text-xs
                      hover:text-[#C4B5FD]
                      transition-colors
                    "
                  >
                    Read More →
                  </Link>

                  {/* Reactions */}
                  <div className="
                    flex items-center gap-2
                    mt-4
                  ">

                    <span className="
                      text-[#94A3B8]
                      text-xs
                    ">
                      React
                    </span>

                    {reactions.map((emoji, i) => (

                      <button
                        key={i}
                        className="
                          text-base
                          hover:scale-125
                          transition-transform
                        "
                      >
                        {emoji}
                      </button>

                    ))}

                  </div>

                </div>

                {/* Stats */}
                <div className="
                  hidden sm:flex
                  flex-col items-end justify-between
                  flex-shrink-0
                ">

                  <div className="text-right">

                    <div className="
                      flex items-center gap-1
                      text-[#94A3B8]
                      justify-end
                    ">

                      <Eye size={13} />

                      <span className="
                        text-white
                        font-bold
                        text-lg
                      ">
                        {post.views || 0}
                      </span>

                    </div>

                    <p className="
                      text-[#94A3B8]
                      text-[10px]
                    ">
                      people
                    </p>

                  </div>

                  <button className="
                    text-[#475569]
                    hover:text-[#94A3B8]
                    transition-colors
                  ">
                    <BookmarkPlus size={16} />
                  </button>

                </div>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  )
}