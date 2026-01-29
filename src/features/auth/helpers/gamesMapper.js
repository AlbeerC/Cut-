const GAME_LABELS = {
  versus: "Versus Battles",
  timeline: "Timeline",
  movie_clues: "Movie Clues",
  six_degrees: "Six Degrees",
  director: "Director",
};

export function mapGamesStatsToUI(gamesByType, timelineAccuracy) {
  return gamesByType.map((game) => {
    let extraStat = null;

    if (
      game.game_type === "timeline" &&
      timelineAccuracy?.accuracy_percentage != null
    ) {
      extraStat = `Precisión: ${timelineAccuracy.accuracy_percentage}%`;
    }

    return {
      id: game.game_type,
      name: GAME_LABELS[game.game_type] ?? game.game_type,
      gamesPlayed: game.games_played,
      extraStat,
    };
  });
}
