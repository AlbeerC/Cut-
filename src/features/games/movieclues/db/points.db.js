import { supabase } from "@/features/auth/lib/supabase";

/* =========================
   START GAME
========================= */
export async function startMovieCluesGame(userId) {
  const { data, error } = await supabase
    .from("games")
    .insert({
      user_id: userId,
      game_type: "movie_clues",
      status: "in_progress",
      score: 0,
    })
    .select("id")
    .single();

  if (error) {
    console.error("❌ startMovieCluesGame", error);
    throw error;
  }

  return data.id;
}

/* =========================
   ADD ROUND
========================= */
export async function addMovieCluesRound({
  gameId,
  roundNumber,
  movieId,
  result,
}) {
  const { error } = await supabase.from("game_rounds").insert({
    game_id: gameId,
    round_number: roundNumber,
    movie_answer_id: movieId,
    result,
  });

  if (error) {
    console.error("❌ addMovieCluesRound", error);
    throw error;
  }
}

/* =========================
   FINISH GAME
========================= */
export const finishMovieCluesGame = async ({ gameId, userId, score }) => {
  // 👉 Finalizar partida
  const { error: gameError } = await supabase
    .from("games")
    .update({
      status: "finished",
      score,
      finished_at: new Date().toISOString(),
    })
    .eq("id", gameId);

  if (gameError) {
    console.error("Error finishing MovieClues game:", gameError);
    throw gameError;
  }

  // 👉 Historial
  const { error: historyError } = await supabase.from("points_history").insert({
    user_id: userId,
    delta: score,
    reason: "movieclues_completed",
  });

  if (historyError) {
    console.error("Error inserting Movie clues points history:", historyError);
    throw historyError;
  }

  // 👉 Sumar puntos reales al usuario
  const { error: profileError } = await supabase.rpc("increment_user_points", {
    p_user_id: userId,
    p_delta: score,
  });

  if (profileError) {
    console.error("Error updating user points (MovieClues):", profileError);
    throw profileError;
  }
};
