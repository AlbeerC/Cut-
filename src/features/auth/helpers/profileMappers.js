import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

const GAME_LABELS = {
  versus: 'Versus',
  timeline: 'Timeline',
  movie_clues: 'Movie Clues',
  six_degrees: 'Six Degrees'
}

export function mapRecentGamesToUI(recentGames) {
  return recentGames.map(game => ({
    id: game.game_id,
    game: GAME_LABELS[game.game_type] ?? game.game_type,
    score: game.score,
    date: formatDistanceToNow(new Date(game.finished_at), {
      addSuffix: true,
      locale: es
    })
  }))
}
