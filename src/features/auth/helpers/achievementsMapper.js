const ACHIEVEMENTS = {
  habitual: {
    title: 'Habitual',
    description: 'Jugaste en 7 días distintos',
    icon: '🔥',
    order: 1
  },
  comprometido: {
    title: 'Comprometido',
    description: 'Jugaste en 30 días distintos',
    icon: '🟦',
    order: 2
  },
  cinepata: {
    title: 'Cinépata',
    description: '100 partidas jugadas',
    icon: '🎬',
    order: 3
  },
  maraton: {
    title: 'Maratón',
    description: '300 partidas jugadas',
    icon: '🏃',
    order: 4
  },
  experto_versus: {
    title: 'Experto en Versus',
    description: '50 partidas completadas',
    icon: '⚔️',
    order: 5
  },
  arquitecto_del_tiempo: {
    title: 'Arquitecto del Tiempo',
    description: '20 partidas de Timeline completadas',
    icon: '🧠',
    order: 6
  },
  alta_puntuacion: {
    title: 'Alta Puntuación',
    description: '800+ puntos en una partida',
    icon: '🏆',
    order: 7
  },
  no_fue_un_rato: {
    title: 'No fue un rato',
    description: 'Más de 10 horas jugadas',
    icon: '⏱️',
    order: 8
  },
  veterano: {
    title: 'Veterano',
    description: 'Más de 50 horas jugadas',
    icon: '🧓',
    order: 9
  }
}


export function mapAchievementsToUI(rows = []) {
  if (!rows.length) return []

  return rows
    .map(row => {
      const config = ACHIEVEMENTS[row.achievement_key]

      if (!config) return null

      return {
        key: row.achievement_key,
        title: config.title,
        description: config.description,
        icon: config.icon,
        unlockedAt: row.unlocked_at
      }
    })
    .filter(Boolean)
    .sort((a, b) => {
      const orderA = ACHIEVEMENTS[a.key]?.order ?? 999
      const orderB = ACHIEVEMENTS[b.key]?.order ?? 999
      return orderA - orderB
    })
}
