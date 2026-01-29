import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

const GAME_LABELS = {
  versus: 'Versus',
  timeline: 'Timeline',
  movie_clues: 'Movie Clues',
  six_degrees: 'Six Degrees',
  director: 'Director'
}

export function mapActivityToUI(activity) {
  return activity.map(item => {
    let text = ''

    if (item.activity_type === 'game_completed') {
      text = `Ganaste un juego de ${GAME_LABELS[item.game_type]}!`
    }

    if (item.activity_type === 'rounds_played') {
      text = `Jugaste ${item.rounds_played} rondas de ${GAME_LABELS[item.game_type]}`
    }

    return {
      id: `${item.activity_type}-${item.activity_date}`,
      text,
      date: formatDistanceToNow(new Date(item.activity_date), {
        addSuffix: true,
        locale: es
      })
    }
  })
}
