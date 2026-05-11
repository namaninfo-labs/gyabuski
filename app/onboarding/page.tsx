'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const screens = [
  {
    title: 'This is your space.',
    subtitle: 'No names. No judgment. Only honesty.',
    icon: '🌙',
    bg: 'from-purple-950/30 to-transparent',
  },
  {
    title: 'Your identity stays hidden.',
    subtitle: 'Your words stay forever.',
    icon: '🔒',
    bg: 'from-indigo-950/30 to-transparent',
  },
  {
    title: 'You are not alone.',
    subtitle: 'Thousands share what you feel, right now.',
    icon: '✦',
    bg: 'from-violet-950/30 to-transparent',
  },
  {
    title: 'Write freely.',
    subtitle: 'No rules. No limits. Just you.',
    icon: '✍️',
    bg: 'from-purple-950/30 to-transparent',
  },
]

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0)
  const router = useRouter()

  function next() {
    if (current === screens.length - 1) {
      localStorage.setItem('gyabuski_onboarded', 'true')
      router.push('/write')
    } else {
      setCurrent(c => c + 1)
    }
  }

  function skip() {
    localStorage.setItem('gyabuski_onboarded', 'true')
    router.push('/feed')
  }

  const screen = screens[current]

  return (
    <div className={`min-h-screen bg-[#0D0D14] flex flex-col items-center justify-center px-8 bg-gradient-to-br ${screen.bg} relative overflow-hidden`}>

      {/* Skip */}
      {current < screens.length - 1 && (
        <button onClick={skip} className="absolute top-6 right-6 text-[#94A3B8] text-sm hover:text-white transition-colors">
          Skip
        </button>
      )}

      {/* Content */}
      <div className="text-center max-w-sm" key={current}>
        <div className="text-6xl mb-8">{screen.icon}</div>
        <h1 className="text-white text-3xl font-light mb-4 leading-tight">{screen.title}</h1>
        <p className="text-[#94A3B8] text-base mb-12">{screen.subtitle}</p>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {screens.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '24px' : '6px',
                height: '6px',
                background: i === current ? '#7C3AED' : '#2D2D42',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-full py-3.5 bg-[#7C3AED] hover:bg-[#6d28d9] text-white rounded-xl text-sm font-medium transition-colors"
        >
          {current === screens.length - 1 ? 'Start Writing →' : 'Next →'}
        </button>
      </div>

    </div>
  )
}