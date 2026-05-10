import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      
      <div className="text-center">
        <h1 className="text-white font-mono text-5xl tracking-widest mb-4">
          GYABUSKI
        </h1>
        <p className="text-zinc-600 text-sm mb-12 font-light">
          a place where untold feelings finally exist
        </p>
        
        <div className="flex flex-col gap-3 items-center">
          <Link 
            href="/write"
            className="w-48 py-3 border border-purple-900 text-purple-400 font-mono text-xs text-center rounded hover:bg-purple-950 transition-colors"
          >
            write something
          </Link>
          <Link 
            href="/feed"
            className="w-48 py-3 border border-zinc-800 text-zinc-600 font-mono text-xs text-center rounded hover:border-zinc-600 transition-colors"
          >
            read the archive
          </Link>
        </div>
      </div>

      <p className="absolute bottom-8 text-zinc-800 font-mono text-xs">
        no names. no faces. just feelings.
      </p>

    </div>
  )
}
