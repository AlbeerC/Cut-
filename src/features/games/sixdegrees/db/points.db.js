import { supabase } from "@/features/auth/lib/supabase";

/* =========================
   START GAME
========================= */
export async function startSixDegreesGame(userId) {
  const { data, error } = await supabase
    .from("games")
    .insert({
      user_id: userId,
      game_type: "six_degrees",
      status: "in_progress",
      score: 0,
    })
    .select("id")
    .single();

  if (error) {
    console.error("❌ startSixDegreesGame", error);
    throw error;
  }

  return data.id;
}


/* =========================
   FINISH GAME
========================= */
export const finishSixDegreesGame = async ({ gameId, userId, score }) => {
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
    console.error("Error finishing sixDegrees game:", gameError);
    throw gameError;
  }

  // 👉 Historial
  const { error: historyError } = await supabase.from("points_history").insert({
    user_id: userId,
    delta: score,
    reason: "sixdegrees_completed",
  });

  if (historyError) {
    console.error("Error inserting Six degrees points history:", historyError);
    throw historyError;
  }

  // 👉 Sumar puntos reales al usuario
  const { error: profileError } = await supabase.rpc("increment_user_points", {
    p_user_id: userId,
    p_delta: score,
  });

  if (profileError) {
    console.error("Error updating user points (SixDegrees):", profileError);
    throw profileError;
  }
};
