import Link from 'next/link'
import { PenSquare } from 'lucide-react'

export default function EmptyFeed() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-20 h-20 rounded-full border border-[#1a1a2e] flex items-center justify-center mb-8">
        <PenSquare className="w-7 h-7 text-zinc-700" />
      </div>

      <h2 className="text-2xl font-light mb-3">
        The archive is silent.
      </h2>

      <p className="text-zinc-600 text-sm max-w-md leading-7 mb-8">
        No one has written anything yet.
        Be the first soul to leave something behind.
      </p>

      <Link
        href="/write"
        className="
          px-6 py-3
          bg-purple-950/60
          border border-purple-800/40
          text-purple-300
          rounded-xl
          text-sm
          hover:bg-purple-950
          transition-colors
        "
      >
        Write anonymously
      </Link>
    </div>
  )
}