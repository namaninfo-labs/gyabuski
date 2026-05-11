'use client'
import { useEffect, useState } from 'react'

const letters = ['G','Y','A','B','U','S','K','I']

export default function Loading() {
  const [visible, setVisible] = useState<boolean[]>(new Array(8).fill(false))

  useEffect(() => {
    letters.forEach((_, i) => {
      setTimeout(() => {
        setVisible(prev => {
          const next = [...prev]
          next[i] = true
          return next
        })
      }, i * 80 + 200)
    })
  }, [])

  return (
    <div className="fixed inset-0 bg-[#0D0D14] flex flex-col items-center justify-center z-50">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-3xl" />
      </div>

      <div className="relative text-center">
        {/* Logo letters */}
        <div className="flex items-center gap-2 mb-3">
          {letters.map((letter, i) => (
            <span
              key={i}
              className="text-5xl font-bold text-white tracking-widest transition-all duration-500"
              style={{
                opacity: visible[i] ? 1 : 0,
                transform: visible[i] ? 'translateY(0)' : 'translateY(12px)',
                fontFamily: 'Inter, sans-serif',
                letterSpacing: '0.2em'
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p
          className="text-[#C4B5FD] text-xs tracking-[0.4em] uppercase transition-all duration-700"
          style={{
            opacity: visible[7] ? 1 : 0,
            transform: visible[7] ? 'translateY(0)' : 'translateY(8px)',
            transitionDelay: '400ms'
          }}
        >
          anonymous emotional archive
        </p>

        {/* Purple line */}
        <div
          className="h-px bg-purple-700 mt-4 mx-auto transition-all duration-500"
          style={{
            width: visible[7] ? '120px' : '0px',
            transitionDelay: '600ms'
          }}
        />
      </div>
    </div>
  )
}