import { supabase } from "@/features/auth/lib/supabase"

export async function fetchTopWeeklyPlayers() {
  return supabase
    .from('weekly_top_players')
    .select('*')
}