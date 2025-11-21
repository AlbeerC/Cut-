export const generateDirectorRounds = (movies, totalRounds = 5) => {

  if (!movies || movies.length < totalRounds) {
    return []
  }

  const validMovies = movies.filter((m) => m && m.director && m.director.name && m.director.name.trim() !== "")

  if (validMovies.length < totalRounds) {
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
  }

  return rounds
}