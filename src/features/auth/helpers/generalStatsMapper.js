const GAME_LABELS = {
  versus: "Versus Battles",
  timeline: "Timeline",
  movie_clues: "Movie Clues",
  six_degrees: "Six Degrees",
  director: "Director",
};


export function mapGeneralStatsToUI(stats) {
  if (!stats) return null

  return {
    hoursPlayed: `${stats.hours_played} h`,
    gamesCompleted: stats.games_completed,
    activeDays: stats.active_days,
    bestStreak: `${stats.best_streak} juegos seguidos`,
    favoriteGame: GAME_LABELS[stats.favorite_game_type] ?? stats.favorite_game_type
  }
}
