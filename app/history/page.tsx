import Link from 'next/link'
import { Clock } from 'lucide-react'

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-[#080810] text-white">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-5 h-5 text-purple-400" />
          <h1 className="text-3xl font-light tracking-wide">History</h1>
        </div>
        <p className="text-zinc-600 text-sm mb-10">Posts you have silently read.</p>

        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full border border-[#1a1a2e] flex items-center justify-center mb-6">
            <Clock className="w-6 h-6 text-zinc-700" />
          </div>
          <p className="text-zinc-500 text-sm mb-2">Nothing read yet.</p>
          <p className="text-zinc-700 text-xs mb-8 max-w-xs">
            Every post you open will leave a quiet trace here.
          </p>
          <Link href="/feed" className="px-6 py-2.5 border border-[#1a1a2e] text-zinc-400 text-sm rounded-xl hover:bg-[#0e0e1a] transition-colors">
            Start reading
          </Link>
        </div>
      </div>
    </div>
  )
}