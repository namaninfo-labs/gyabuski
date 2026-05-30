import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function generateAnonId(): string {
  const prefixes = ['VOID', 'M', 'VX', 'NX', 'ECHO', 'DRIFT']
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
  const num = Math.floor(Math.random() * 900) + 100
  const suffix = Math.random().toString(36).substring(2, 4).toUpperCase()
  return `${prefix}-${num}${suffix}`
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && session?.user) {
      // Profile already hai ya nahi check karo
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', session.user.id)
        .single()

      // Nahi hai toh create karo
      if (!existing) {
        await supabase
          .from('profiles')
          .insert([{
            id: session.user.id,
            anon_id: generateAnonId(),
          }])
      }

      // Home pe bhejo
      return NextResponse.redirect(`${origin}/home`)
    }
  }

  // Kuch galat hua toh landing pe bhejo
  return NextResponse.redirect(`${origin}/`)
}