import { supabase } from './supabase'

export async function incrementView(postId: number) {

  // avoid duplicate count in same session
  const key = `view_${postId}`

  if (typeof window !== 'undefined') {

    if (sessionStorage.getItem(key)) {
      return
    }

    sessionStorage.setItem(key, 'true')
  }

  await supabase.rpc('increment_views', {
    post_id: postId,
  })
}