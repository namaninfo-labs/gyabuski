import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0D0D14] flex flex-col relative overflow-hidden">

      {/* Background atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-purple-900/8 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-indigo-900/6 blur-3xl" />
      </div>

      {/* Top right sign in */}
      <div className="relative flex justify-end p-6">
        <Link href="/login" className="text-[#94A3B8] text-sm hover:text-white transition-colors">
          Sign in
        </Link>
      </div>

      {/* Main content */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-8 text-center">

        {/* Logo */}
        <div className="mb-3">
          <h1 className="text-white font-bold tracking-[0.5em] text-5xl md:text-7xl mb-3" style={{fontFamily:'Inter,sans-serif'}}>
            G Y A B U S K I
          </h1>
          <p className="text-[#C4B5FD] text-xs tracking-[0.4em] uppercase">anonymous emotional archive</p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-10">
          <div className="w-20 h-px bg-[#2D2D42]"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-purple-700"></div>
          <div className="w-20 h-px bg-[#2D2D42]"></div>
        </div>

        {/* Quote */}
        <p className="text-[#E2E8F0] text-2xl md:text-3xl font-light mb-3 max-w-lg leading-relaxed">
          Some things are easier to{' '}
          <span className="text-[#C4B5FD] italic">write</span>{' '}
          than to say.
        </p>
        <p className="text-[#94A3B8] text-sm mb-12">No names. No judgment. Only real feelings.</p>

        {/* Entry options */}
        <div className="flex flex-col items-center gap-4 mb-8 w-full max-w-xs">
          <div className="flex gap-3 w-full">
            <Link href="/feed" className="flex-1 flex items-center justify-center gap-2 py-3 border border-[#2D2D42] text-[#E2E8F0] rounded-xl text-sm hover:bg-[#13131E] hover:border-[#3d3d5c] transition-all">
              📖 Read
            </Link>
            <Link href="/write" className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#7C3AED] hover:bg-[#6d28d9] text-white rounded-xl text-sm transition-colors">
              ✦ Write
            </Link>
          </div>

          {/* Username entry */}
          <div className="flex gap-2 w-full">
            <input
              placeholder="Enter username"
              className="flex-1 bg-[#13131E] border border-[#2D2D42] rounded-xl px-4 py-2.5 text-[#E2E8F0] text-sm placeholder-[#475569] outline-none focus:border-[#7C3AED] transition-colors"
            />
            <Link href="/login" className="px-4 py-2.5 bg-[#7C3AED] text-white rounded-xl text-sm hover:bg-[#6d28d9] transition-colors">
              Continue
            </Link>
          </div>
          <Link href="/register" className="text-[#94A3B8] text-xs hover:text-[#C4B5FD] transition-colors">
            New here? Create an account
          </Link>
        </div>

        {/* 3 pillars */}
        <div className="flex gap-8 text-center">
          {[
            { icon: '🔒', label: 'No names' },
            { icon: '🛡', label: 'Total privacy' },
            { icon: '💜', label: 'Real feelings' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-[#2D2D42] flex items-center justify-center text-sm">{icon}</div>
              <span className="text-[#475569] text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="relative text-center text-[#2D2D42] font-mono text-xs pb-8">
        What's on your mind tonight? Write it out. Read what stays.
      </p>
    </div>
  )
}