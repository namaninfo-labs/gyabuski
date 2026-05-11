'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Bookmark } from 'lucide-react'

export default function BookmarksPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { setLoading(false); return }
      setLoggedIn(true)

      const { data: bms } = await supabase
        .from('bookmarks').select('post_id').eq('user_id', user.id)
      if (!bms || bms.length === 0) { setLoading(false); return }

      const ids = bms.map(b => b.post_id)
      const { data: savedPosts } = await supabase
        .from('posts').select('*').in('id', ids)
      setPosts(savedPosts || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-[#0D0D14] text-white">
      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-2">
          <Bookmark size={20} className="text-[#C4B5FD]" />
          <h1 className="text-2xl font-bold">Bookmarks</h1>
        </div>
        <p className="text-[#94A3B8] text-xs mb-8">Feelings you wanted to remember.</p>

        {!loggedIn ? (
          <div className="text-center py-20">
            <p className="text-[#94A3B8] mb-4">Sign in to save bookmarks.</p>
            <Link href="/login" className="px-4 py-2 bg-[#7C3AED] text-white text-sm rounded-xl">Sign in</Link>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <Bookmark size={32} className="text-[#2D2D42] mx-auto mb-4" />
            <p className="text-[#94A3B8] text-sm mb-6">Nothing saved yet.</p>
            <Link href="/feed" className="px-4 py-2.5 border border-[#2D2D42] text-[#94A3B8] text-sm rounded-xl">Read the archive</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map(post => (
              <Link key={post.id} href={`/post/${post.id}`}
                className="bg-[#13131E] border border-[#2D2D42] rounded-2xl p-5 hover:border-[#7C3AED]/30 transition-all"
              >
                <p className="text-[#E2E8F0] text-sm leading-relaxed line-clamp-3">{post.content}</p>
                <p className="text-[#C4B5FD] font-mono text-xs mt-3">{post.anon_id}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}