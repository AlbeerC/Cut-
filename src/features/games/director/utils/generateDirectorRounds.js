export const generateDirectorRounds = (movies, totalRounds = 5) => {
  // Mezclamos el pool para evitar repeticiones
  const shuffled = [...movies].sort(() => Math.random() - 0.5)

  const rounds = []

  for (let i = 0; i < totalRounds; i++) {
    const movie = shuffled[i]

    const correctDirector = movie.director

    // Sacamos una lista de TODOS los directores del pool
    const allDirectors = movies
      .map(m => m.director)
      .filter(d => d && d !== correctDirector)

    // Mezclamos y elegimos 3 directores falsos
    const fakeDirectors = allDirectors
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    // Opciones mezcladas
    const options = [...fakeDirectors, correctDirector]
      .sort(() => Math.random() - 0.5)

    rounds.push({
      movie,
      correctDirector,
      options
    })
  }

  return rounds
}
