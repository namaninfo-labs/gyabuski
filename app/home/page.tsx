import Link from 'next/link'
import { BookOpen, Pen, Lock, Shield, Heart } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0D0D14]">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/backgrounds/bg1.jpeg')" }}
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">

        {/* Logo */}
        <h1
          className="logo-font text-white text-center mb-3 select-none"
          style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
        >
          G Y A B U S K I
        </h1>

        <p className="text-[#C4B5FD] text-[10px] md:text-[11px] tracking-[0.45em] uppercase mb-5 text-center">
          anonymous emotional archive
        </p>

        {/* Decorative divider */}
        <div className="flex items-center mb-10">
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#7C3AED]" />
          <div className="w-2 h-2 rounded-full bg-[#7C3AED] mx-2 shadow-[0_0_8px_#7C3AED]" />
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#7C3AED]" />
        </div>

        {/* Quote */}
        <div className="text-center mb-10 max-w-lg">
          <p className="text-white/90 text-xl md:text-2xl font-light leading-relaxed">
            <span className="text-[#C4B5FD] text-2xl mr-1">"</span>
            Some feelings don't need answers,{' '}
            they just need a{' '}
            <span className="text-[#C4B5FD]">page.</span>
            <span className="text-[#C4B5FD] text-2xl ml-1">"</span>
          </p>
        </div>

        {/* Read + Write cards */}
        <div className="w-full max-w-lg mb-8">
          <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex">

              {/* Read */}
              <Link
                href="/feed"
                className="flex-1 flex items-center gap-4 px-7 py-6 hover:bg-white/5 transition-all group border-r border-white/10"
              >
                <BookOpen
                  size={26}
                  className="text-[#7C3AED] group-hover:text-[#C4B5FD] transition-colors flex-shrink-0"
                />
                <div>
                  <p className="text-white font-medium text-base">Read</p>
                  <p className="text-[#94A3B8] text-xs mt-0.5">anonymous stories</p>
                </div>
              </Link>

              {/* Write */}
              <Link
                href="/write"
                className="flex-1 flex items-center gap-4 px-7 py-6 hover:bg-white/5 transition-all group"
              >
                <Pen
                  size={24}
                  className="text-[#7C3AED] group-hover:text-[#C4B5FD] transition-colors flex-shrink-0"
                />
                <div>
                  <p className="text-white font-medium text-base">Write</p>
                  <p className="text-[#94A3B8] text-xs mt-0.5">share your thoughts</p>
                </div>
              </Link>

            </div>
          </div>
        </div>

        {/* Privacy pillars */}
        <div className="flex items-center gap-8 md:gap-12">
          {[
            { icon: Lock, label: 'No names' },
            { icon: Shield, label: 'Total privacy' },
            { icon: Heart, label: 'Real feelings' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <Icon size={20} className="text-[#7C3AED]" strokeWidth={1.5} />
              <span className="text-[#94A3B8] text-xs">{label}</span>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <p className="absolute bottom-8 text-center text-[#475569] text-xs px-4 leading-relaxed">
          What's on your mind tonight?<br />
          Write it out. Read what stays.
        </p>

      </div>
    </div>
  )
}