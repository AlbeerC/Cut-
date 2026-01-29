import { supabase } from "../lib/supabase"

export async function fetchProfileBase(userId) {
  return supabase
    .from('profiles')
    .select('id, points')
    .eq('id', userId)
    .single()
}

export async function fetchProfileStats(userId) {
  return supabase
    .from('user_profile_stats')
    .select('*')
    .eq('user_id', userId)
    .single()
}

export async function fetchRecentGames(userId, limit = 3) {
  return supabase
    .from('user_recent_games')
    .select('*')
    .eq('user_id', userId)
    .limit(limit)
}

export async function fetchActivityFeed(userId, limit = 5) {
  return supabase
    .from('user_activity_feed')
    .select('*')
    .eq('user_id', userId)
    .order('activity_date', { ascending: false })
    .limit(limit)
}

export async function fetchGameTypeStats(userId) {
  return supabase
    .from('user_game_type_stats')
    .select('*')
    .eq('user_id', userId)
}

export async function fetchTimelineAccuracy(userId) {
  return supabase
    .from('user_timeline_accuracy')
    .select('*')
    .eq('user_id', userId)
    .single()
}


export async function fetchGeneralStats(userId) {
  return supabase
    .from('profile_general_stats')
    .select('*')
    .eq('user_id', userId)
    .single()
}


export async function fetchAchievements(userId) {
  return supabase
    .from('user_achievements')
    .select('*')
    .eq('user_id', userId)
    .order('unlocked_at', { ascending: false })
    .limit(5)
}