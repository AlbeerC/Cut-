const SAGA_KEYWORDS = [
  "avengers",
  "harry potter",
  "star wars",
  "lord of the rings",
  "hobbit",
  "fast & furious",
  "mission: impossible",
  "jurassic",
  "transformers",
  "pirates of the caribbean",
  "x-men",
  "batman",
  "spider-man"
]

const getSagaKey = (title = "") => {
  const lower = title.toLowerCase()
  return SAGA_KEYWORDS.find((key) => lower.includes(key)) || null
}

export const pickRandomMovies = (movies, amount) => {
  const shuffled = [...movies].sort(() => Math.random() - 0.5)

  const selected = []
  const usedSagas = new Set()

  for (const movie of shuffled) {
    if (selected.length >= amount) break

    const sagaKey = getSagaKey(movie.title)

    if (sagaKey && usedSagas.has(sagaKey)) continue

    selected.push(movie)
    if (sagaKey) usedSagas.add(sagaKey)
  }

  // fallback
  if (selected.length < amount) {
    const remaining = shuffled.filter(
      (m) => !selected.some((s) => s.id === m.id)
    )
    selected.push(...remaining.slice(0, amount - selected.length))
  }

  return selected
}
