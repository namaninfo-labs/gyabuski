import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080810] flex flex-col items-center justify-center px-6 text-center">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-purple-900/8 blur-3xl" />
      </div>

      <div className="relative">
        <p className="text-purple-800 font-mono text-8xl font-light mb-4">404</p>
        <h1 className="text-zinc-300 text-2xl font-light mb-3">
          This page got lost somewhere between a memory and a wish.
        </h1>
        <p className="text-zinc-600 text-sm mb-10 max-w-sm">
          The feeling you were looking for doesn't exist here — or maybe it was never meant to be found.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/feed" className="px-6 py-2.5 border border-[#1a1a2e] text-zinc-400 text-sm rounded-xl hover:bg-[#0e0e1a] transition-colors">
            Read the archive
          </Link>
          <Link href="/" className="px-6 py-2.5 bg-purple-950/60 border border-purple-800/40 text-purple-300 text-sm rounded-xl hover:bg-purple-950 transition-colors">
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}