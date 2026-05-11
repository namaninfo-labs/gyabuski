import { supabase } from './supabase'

export type Post = {
  id: number
  anon_id: string
  content: string
  created_at: string
  views: number
  mood_tag?: string
  title?: string
}

export async function fetchLatest(): Promise<Post[]> {

  const { data } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  return data || []
}

export async function fetchTrending(): Promise<Post[]> {

  // Trending = most viewed in last 7 days
  const weekAgo = new Date(
    Date.now() - 7 * 86400000
  ).toISOString()

  const { data } = await supabase
    .from('posts')
    .select('*')
    .gte('created_at', weekAgo)
    .order('views', { ascending: false })
    .limit(50)

  return data || []
}

export async function fetchMostLiked(): Promise<Post[]> {

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .limit(100)

  if (!posts) return []

  const { data: reactions } = await supabase
    .from('reactions')
    .select('post_id')

  if (!reactions) return posts

  const counts: Record<number, number> = {}

  reactions.forEach((reaction) => {

    counts[reaction.post_id] =
      (counts[reaction.post_id] || 0) + 1
  })

  return posts.sort(
    (a, b) =>
      (counts[b.id] || 0) -
      (counts[a.id] || 0)
  )
}

export async function fetchByMood(
  mood: string
): Promise<Post[]> {

  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('mood_tag', mood)
    .order('created_at', { ascending: false })

  return data || []
}