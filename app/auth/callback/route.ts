import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateAnonId } from '@/lib/generateId'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { session } } = await supabase.auth.exchangeCodeForSession(code)

    if (session?.user) {
      // Check if profile exists
      const { data: existing } = await supabase
        .from('profiles').select('id').eq('id', session.user.id).single()

      // Create profile if first time
      if (!existing) {
        await supabase.from('profiles').insert([{
          id: session.user.id,
          anon_id: generateAnonId()
        }])
      }
    }
  }

  return NextResponse.redirect(`${origin}/feed`)
}