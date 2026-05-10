'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { generateAnonId } from '@/lib/generateId'

export default function WritePage() {
  const [content, setContent] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [anonId, setAnonId] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    if (!content.trim()) return
    setLoading(true)

    const id = generateAnonId()

    const { error } = await supabase
      .from('posts')
      .insert([{
        content: content,
        anon_id: id,
        views: 0
      }])

    console.log('Supabase error:', error)

    if (!error) {
      setAnonId(id)
      setSubmitted(true)
    }

    setLoading(false)
  }

  if (submitted) return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="text-center">
        <p className="text-purple-400 font-mono text-sm mb-2">You exist here as</p>
        <p className="text-white font-mono text-2xl mb-6">{anonId}</p>
        <p className="text-zinc-500 text-sm">Your words are out there now.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="w-full max-w-xl">
        <p className="text-zinc-600 font-mono text-xs mb-8 text-center">
          no name. no identity. just what you feel.
        </p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="write what you couldn't say..."
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-6 text-zinc-300 text-sm resize-none h-64 focus:outline-none focus:border-purple-900 placeholder-zinc-700"
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !content.trim()}
          className="mt-4 w-full py-3 bg-purple-950 hover:bg-purple-900 text-purple-300 font-mono text-sm rounded-lg transition-colors disabled:opacity-40"
        >
          {loading ? 'leaving your words...' : 'let it exist'}
        </button>
      </div>
    </div>
  )
}