'use client'

import { useEffect, useState } from 'react'

export default function SoulsCounter() {
  const [count, setCount] = useState(128)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        const random = Math.floor(Math.random() * 3)

        return Math.random() > 0.5
          ? prev + random
          : prev - random
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-3 text-sm text-zinc-400">
      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

      <span>
        {count} souls here right now
      </span>
    </div>
  )
}