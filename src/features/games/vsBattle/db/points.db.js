import { supabase } from "@/features/auth/lib/supabase";

/**
 * Crea una nueva partida de Versus
 * @param {string} userId
 * @returns {string} gameId
 */
export const startVersusGame = async (userId) => {
  const { data, error } = await supabase
    .from("games")
    .insert({
      user_id: userId,
      game_type: "versus",
      status: "in_progress",
      score: 0,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error starting Versus game:", error);
    throw error;
  }

  return data.id;
};

/**
 * Finaliza una partida de Versus y asigna puntos
 * @param {Object} params
 * @param {string} params.gameId
 * @param {string} params.userId
 * @param {number} params.score
 */
export const finishVersusGame = async ({ gameId, userId, score = 50 }) => {
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
    console.error("Error finishing Versus game:", gameError);
    throw gameError;
  }

  // 2. Registrar historial
  const { error: historyError } = await supabase
    .from("points_history")
    .insert({
      user_id: userId,
      delta: score,
      reason: "versus_completed",
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
