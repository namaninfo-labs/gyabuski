'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Eye, Pen } from 'lucide-react'

function timeAgo(d: string) {
  const s = Math.floor((Date.now() - new Date(d).getTime()) / 1000)
  if (s < 86400) return `${Math.floor(s/3600)}h ago`
  return `${Math.floor(s/86400)} days ago`
}

export default function MyStoriesPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [anonId, setAnonId] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }

      const { data: profile } = await supabase
        .from('profiles').select('anon_id').eq('id', user.id).single()
      if (profile) {
        setAnonId(profile.anon_id)
        const { data: myPosts } = await supabase
          .from('posts').select('*')
          .eq('anon_id', profile.anon_id)
          .order('created_at', { ascending: false })
        setPosts(myPosts || [])
      }
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-[#0D0D14] text-white">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-2">
          <Pen size={20} className="text-[#C4B5FD]" />
          <h1 className="text-2xl font-bold">My Stories</h1>
        </div>
        {anonId && <p className="text-[#94A3B8] text-xs mb-8 font-mono">as {anonId}</p>}

        {loading ? (
          <p className="text-[#475569] text-sm">Loading...</p>
        ) : !anonId ? (
          <div className="text-center py-20">
            <p className="text-[#94A3B8] mb-4">Sign in to see your stories.</p>
            <Link href="/login" className="px-4 py-2 bg-[#7C3AED] text-white text-sm rounded-xl">Sign in</Link>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#94A3B8] text-sm mb-6">You haven't written anything yet.</p>
            <Link href="/write" className="px-4 py-2.5 bg-[#7C3AED] text-white text-sm rounded-xl">Write something</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map(post => (
              <Link key={post.id} href={`/post/${post.id}`}
                className="bg-[#13131E] border border-[#2D2D42] rounded-2xl p-5 hover:border-[#7C3AED]/30 transition-all"
              >
                <p className="text-[#E2E8F0] text-sm leading-relaxed line-clamp-3 mb-3">{post.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#475569] text-xs">{timeAgo(post.created_at)}</span>
                  <div className="flex items-center gap-1 text-[#94A3B8] text-xs">
                    <Eye size={12} /> {post.views || 0} reads
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}