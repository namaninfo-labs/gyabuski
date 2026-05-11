'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { generateAnonId } from '@/lib/generateId'
import { Music, Tag, Shield, ChevronDown } from 'lucide-react'

const MOODS = [
  { label:'Sad', emoji:'😢' },{ label:'Lonely', emoji:'🌙' },
  { label:'Anxious', emoji:'😰' },{ label:'Hopeful', emoji:'✨' },
  { label:'Angry', emoji:'🔥' },{ label:'Grateful', emoji:'❤️' },
  { label:'Confused', emoji:'❓' },{ label:'Tired', emoji:'😴' },
  { label:'Calm', emoji:'🌿' },
]

export default function WritePage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mood, setMood] = useState('')
  const [showMoods, setShowMoods] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [anonId, setAnonId] = useState('')
  const [loading, setLoading] = useState(false)
  const [draftSaved, setDraftSaved] = useState(false)
  const maxChars = 1000

  // Auto-save draft
  useEffect(() => {
    if (!content) return
    const timer = setTimeout(() => {
      localStorage.setItem('gyabuski_draft', JSON.stringify({ title, content, mood }))
      setDraftSaved(true)
      setTimeout(() => setDraftSaved(false), 2000)
    }, 3000)
    return () => clearTimeout(timer)
  }, [content, title, mood])

  // Load draft
  useEffect(() => {
    const saved = localStorage.getItem('gyabuski_draft')
    if (saved) {
      const { title: t, content: c, mood: m } = JSON.parse(saved)
      setTitle(t || '')
      setContent(c || '')
      setMood(m || '')
    }
  }, [])

  async function handleSubmit() {
    if (!content.trim()) return
    setLoading(true)
    const id = generateAnonId()
    const { error } = await supabase.from('posts').insert([{
      content, anon_id: id, views: 0, mood_tag: mood || null
    }])
    if (!error) {
      setAnonId(id)
      setSubmitted(true)
      localStorage.removeItem('gyabuski_draft')
    }
    setLoading(false)
  }

  const charColor = content.length > 900 ? '#EC4899' : content.length > 750 ? '#F59E0B' : '#475569'

  if (submitted) return (
    <div className="min-h-screen bg-[#0D0D14] flex items-center justify-center px-6">
      <div className="text-center max-w-md animate-fade-up">
        <div className="w-16 h-16 rounded-full bg-purple-950/50 border border-purple-800/40 flex items-center justify-center mx-auto mb-6">
          <Shield className="w-7 h-7 text-[#C4B5FD]" />
        </div>
        <h2 className="text-white text-2xl font-light mb-2">It exists now.</h2>
        <p className="text-[#94A3B8] text-sm mb-6">Your words are safe in the archive forever.</p>
        <div className="bg-[#13131E] border border-[#2D2D42] rounded-xl p-4 mb-8">
          <p className="text-[#94A3B8] text-xs mb-1">You exist here as</p>
          <p className="text-[#C4B5FD] font-mono text-xl">{anonId}</p>
        </div>
        <div className="flex gap-3 justify-center">
          <a href="/feed" className="px-5 py-2.5 border border-[#2D2D42] text-[#94A3B8] text-sm rounded-xl hover:bg-[#13131E] transition-colors">Read archive</a>
          <button onClick={() => { setSubmitted(false); setContent(''); setTitle(''); setMood('') }} className="px-5 py-2.5 bg-[#7C3AED] text-white text-sm rounded-xl hover:bg-[#6d28d9] transition-colors">Write another</button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0D0D14] text-white">

      {/* Page header */}
      <div className="border-b border-[#2D2D42] px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-white text-2xl font-bold">Write</h1>
            <span className="text-lg">✏️</span>
          </div>
          <p className="text-[#94A3B8] text-xs mt-0.5">Let it out. No names. No judgment. Just you.</p>
        </div>
        {draftSaved && (
          <span className="text-[#10B981] text-xs font-mono">✓ Saved as draft</span>
        )}
      </div>

      <div className="flex gap-0">

        {/* Main editor */}
        <div className="flex-1 px-6 py-6">
          <div className="max-w-2xl">

            {/* Title */}
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={100}
              placeholder="Title (optional)"
              className="w-full bg-transparent text-white text-xl placeholder-[#475569] outline-none border-none mb-2"
            />
            <p className="text-[#475569] text-xs mb-5">How are you feeling right now?</p>

            {/* Textarea */}
            <div className="bg-[#13131E] border border-[#2D2D42] rounded-2xl p-5 mb-4">
              <textarea
                value={content}
                onChange={e => e.target.value.length <= maxChars && setContent(e.target.value)}
                placeholder="Write your thoughts..."
                className="w-full bg-transparent text-[#E2E8F0] text-sm leading-8 placeholder-[#475569] outline-none resize-none min-h-[280px]"
              />
              <p className="text-right text-xs" style={{ color: charColor }}>
                {content.length} / {maxChars}
              </p>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-3 flex-wrap mb-5">
              {/* Mood */}
              <div className="relative">
                <button onClick={() => setShowMoods(!showMoods)} className="flex items-center gap-1.5 px-3 py-2 bg-[#13131E] border border-[#2D2D42] rounded-xl text-[#94A3B8] text-xs hover:border-[#7C3AED] transition-colors">
                  <span>{mood ? MOODS.find(m => m.label === mood)?.emoji : '😶'}</span>
                  <span>{mood || 'Mood'}</span>
                  <ChevronDown size={12} />
                </button>
                {showMoods && (
                  <div className="absolute top-full mt-1 left-0 bg-[#13131E] border border-[#2D2D42] rounded-xl p-2 z-20 grid grid-cols-3 gap-1 w-44">
                    {MOODS.map(m => (
                      <button key={m.label} onClick={() => { setMood(m.label); setShowMoods(false) }}
                        className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#7C3AED]/20 text-xs text-[#94A3B8] hover:text-white transition-colors"
                      >
                        <span className="text-lg">{m.emoji}</span>
                        <span>{m.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="flex items-center gap-1.5 px-3 py-2 bg-[#13131E] border border-[#2D2D42] rounded-xl text-[#94A3B8] text-xs hover:border-[#7C3AED] transition-colors">
                <Tag size={12} /> Add tags
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-[#13131E] border border-[#2D2D42] rounded-xl text-[#94A3B8] text-xs hover:border-[#7C3AED] transition-colors">
                <Music size={12} /> Add song
              </button>

              {/* Anonymous toggle — always on */}
              <div className="ml-auto flex items-center gap-2">
                <span className="text-[#94A3B8] text-xs">Anonymous</span>
                <div className="w-9 h-5 bg-[#7C3AED] rounded-full flex items-center justify-end px-0.5 cursor-not-allowed">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <span className="text-[#475569] text-xs">always</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <button className="px-4 py-3 border border-[#2D2D42] text-[#94A3B8] text-sm rounded-xl hover:bg-[#13131E] transition-colors">
                Save Draft
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading || !content.trim()}
                className="flex-1 py-3 bg-[#7C3AED] hover:bg-[#6d28d9] text-white text-sm rounded-xl transition-colors disabled:opacity-40 font-medium"
              >
                {loading ? 'Saving...' : '✦ Let it exist — Post anonymously'}
              </button>
            </div>
            <p className="text-center text-[#475569] text-xs mt-4">
              🔒 Your identity is never revealed. Your words are safe here.
            </p>
          </div>
        </div>

        {/* Right panel */}
        <div className="hidden lg:block w-72 flex-shrink-0 border-l border-[#2D2D42] px-5 py-6">
          <p className="text-[#7C3AED] font-semibold text-sm mb-1">Writing is healing.</p>
          <p className="text-[#94A3B8] text-xs mb-6">A few gentle reminders</p>

          {[
            { icon:'✏️', title:'Write freely', sub:'There are no rules here.' },
            { icon:'🤝', title:'You are not alone', sub:'Many feel what you feel.' },
            { icon:'🔒', title:"It's safe here", sub:'No names. No judgment.' },
            { icon:'💜', title:'Be honest', sub:'Honesty is connection.' },
          ].map(r => (
            <div key={r.title} className="flex gap-3 mb-4">
              <span className="text-base mt-0.5">{r.icon}</span>
              <div>
                <p className="text-[#E2E8F0] text-sm">{r.title}</p>
                <p className="text-[#94A3B8] text-xs">{r.sub}</p>
              </div>
            </div>
          ))}

          <div className="border-t border-[#2D2D42] pt-4 mt-4">
            <p className="text-[#94A3B8] text-xs mb-3">What's on your mind? Choose a mood</p>
            <div className="grid grid-cols-3 gap-2">
              {MOODS.map(m => (
                <button key={m.label} onClick={() => setMood(m.label)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs transition-all ${mood === m.label ? 'bg-[#7C3AED]/20 text-[#C4B5FD] border border-[#7C3AED]/40' : 'text-[#475569] hover:text-[#94A3B8] hover:bg-[#13131E]'}`}
                >
                  <span className="text-lg">{m.emoji}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}