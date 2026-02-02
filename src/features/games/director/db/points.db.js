import { supabase } from "@/features/auth/lib/supabase";

/**
 * Crea una nueva partida de "Quién la dirigió"
 */
export const startDirectorGame = async (userId) => {

  if (!userId) return null;

  const { data, error } = await supabase
    .from("games")
    .insert({
      user_id: userId,
      game_type: "director",
      status: "in_progress",
      score: 0,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error starting Director game:", error);
    throw error;
  }

  return data.id;
};


/**
 * Registra una ronda del juego
 */
export const addDirectorRound = async ({
  gameId,
  roundNumber,
  movieId,
  result,
}) => {

  if (!gameId || !roundNumber || !movieId) return null;

  const { error } = await supabase.from("game_rounds").insert({
    game_id: gameId,
    round_number: roundNumber,
    movie_a_id: movieId,
    result, // 'correct' | 'incorrect'
  });

  if (error) {
    console.error("Error adding Director round:", error);
    throw error;
  }
};


/**
 * Finaliza la partida y registra los puntos finales
 */
export const finishDirectorGame = async ({
  gameId,
  userId,
  score,
}) => {

  if (!gameId || !userId || !score) return null;

      console.log("🚨 finishDirectorGame CALLED", { gameId, userId, score });
  // 1. Finalizar la partida
  const { error: gameError } = await supabase
    .from("games")
    .update({
      status: "finished",
      score,
      finished_at: new Date().toISOString(),
    })
    .eq("id", gameId);

  if (gameError) {
    console.error("Error finishing Director game:", gameError);
    throw gameError;
  }

  // 2. Registrar historial
  const { error: historyError } = await supabase
    .from("points_history")
    .insert({
      user_id: userId,
      delta: score,
      reason: "director_completed",
    });

  if (historyError) {
    console.error("Error inserting points history:", historyError);
    throw historyError;
  }

  // 3. SUMAR puntos reales al usuario
  const { error: profileError } = await supabase.rpc(
    "increment_user_points",
    {
      p_user_id: userId,
      p_delta: score,
    }
  );

  if (profileError) {
    console.error("Error updating user points:", profileError);
    throw profileError;
  }
};
