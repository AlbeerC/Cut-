export const generateDirectorRounds = (movies, totalRounds = 5) => {
  console.log("[v0] generateDirectorRounds llamado con", movies?.length, "películas y", totalRounds, "rondas")

  if (!movies || movies.length < totalRounds) {
    console.error("[v0] No hay suficientes películas para generar rondas")
    return []
  }

  const validMovies = movies.filter((m) => m && m.director && m.director.name && m.director.name.trim() !== "")

  console.log("[v0] Películas válidas con directores:", validMovies.length)

  if (validMovies.length < totalRounds) {
    console.error("[v0] No hay suficientes películas válidas con directores")
    return []
  }

  // Mezclamos el pool para evitar repeticiones
  const shuffled = [...validMovies].sort(() => Math.random() - 0.5)

  const rounds = []
  let index = 0

  while (rounds.length < totalRounds && index < shuffled.length) {
    const movie = shuffled[index]
    index++

    if (!movie || !movie.director) {
      console.warn("[v0] Película o director indefinido, saltando...")
      continue
    }

    const correctDirector = movie.director

    const uniqueDirectors = new Map()

    validMovies.forEach((m) => {
      if (m.director && m.director.name !== correctDirector.name) {
        uniqueDirectors.set(m.director.name, m.director)
      }
    })

    const allDirectors = Array.from(uniqueDirectors.values())

    if (allDirectors.length < 3) {
      console.warn("[v0] No hay suficientes directores únicos para la película:", movie.title)
      continue
    }

    // Mezclamos y elegimos 3 directores falsos
    const fakeDirectors = allDirectors.sort(() => Math.random() - 0.5).slice(0, 3)

    // Opciones mezcladas (3 falsos + 1 correcto)
    const options = [...fakeDirectors, correctDirector].sort(() => Math.random() - 0.5)

    rounds.push({
      movie,
      correctDirector,
      options,
    })

    console.log(`[v0] Ronda ${rounds.length} generada:`, movie.title, "dirigida por", correctDirector.name)
  }

  if (rounds.length < totalRounds) {
    console.warn(`[v0] Solo se generaron ${rounds.length} de ${totalRounds} rondas solicitadas`)
  }

  console.log("[v0] Total de rondas generadas:", rounds.length)
  return rounds
}