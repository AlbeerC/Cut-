import { supabase } from "@/features/auth/lib/supabase";

// 1️⃣ Crear partida
export const startTimelineGame = async (userId) => {
  const { data, error } = await supabase
    .from("games")
    .insert({
      user_id: userId,
      game_type: "timeline",
      status: "in_progress",
    })
    .select("id")
    .single();

  if (error) {
    console.error("Error starting Timeline game:", error);
    throw error;
  }

  return data.id;
};

// 2️⃣ Guardar ronda
export const addTimelineRound = async ({
  gameId,
  roundNumber,
  result
}) => {
  const { error } = await supabase.from("game_rounds").insert({
    game_id: gameId,
    round_number: roundNumber,
    result,
  });

  if (error) {
    console.error("Error inserting Timeline round:", error);
    throw error;
  }
};

// 3️⃣ Finalizar partida + sumar puntos
export const finishTimelineGame = async ({ gameId, userId, score }) => {
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
    console.error("Error finishing Timeline game:", gameError);
    throw gameError;
  }

  // 👉 Historial
  const { error: historyError } = await supabase.from("points_history").insert({
    user_id: userId,
    delta: score,
    reason: "timeline_completed",
  });

  if (historyError) {
    console.error("Error inserting Timeline points history:", historyError);
    throw historyError;
  }

  // 👉 Sumar puntos reales al usuario
  const { error: profileError } = await supabase.rpc("increment_user_points", {
    p_user_id: userId,
    p_delta: score,
  });

  if (profileError) {
    console.error("Error updating user points (Timeline):", profileError);
    throw profileError;
  }
};
