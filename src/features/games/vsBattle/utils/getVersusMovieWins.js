import { supabase } from "@/features/auth/lib/supabase"

export const getVersusMovieWins = async (movieId) => {
  const { data, error } = await supabase
    .from("versus_movie_wins")
    .select("wins")
    .eq("movie_id", movieId)
    .single()

  if (error && error.code !== "PGRST116") {
    console.error("Error fetching movie wins", error)
    throw error
  }

  return data?.wins ?? 0
}
