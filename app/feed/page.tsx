'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Post = {
  id: string
  content: string
  anon_id: string
  created_at: string
  views: number
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      console.log('Feed error:', error)
      if (data) setPosts(data)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-zinc-700 font-mono text-xs">reading the archive...</p>
    </div>
  )

  if (posts.length === 0) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-zinc-700 font-mono text-xs">nothing yet. be the first.</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-black px-6 py-16">
      <div className="max-w-xl mx-auto">

        <p className="text-zinc-700 font-mono text-xs text-center mb-12">
          anonymous entries — {posts.length} feelings exist here
        </p>

        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-zinc-900 rounded-lg p-6 bg-zinc-950"
            >
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                {post.content}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-purple-700 font-mono text-xs">
                  {post.anon_id}
                </span>
                <span className="text-zinc-700 font-mono text-xs">
                  {new Date(post.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          
           <a href="/write"
            className="text-zinc-600 font-mono text-xs hover:text-purple-500 transition-colors"
          >
            leave your own words
          </a>
        </div>

      </div>
    </div>
  )
}