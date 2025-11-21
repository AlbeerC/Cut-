const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

// 👉 Trae un pool grande y variado
const fetchMoviePool = async (limit = 150) => {
  let movies = []
  let page = 1

  while (movies.length < limit) {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`)

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.results || data.results.length === 0) break

    movies = [...movies, ...data.results]
    page++

    if (page > data.total_pages) break
  }

  return movies.slice(0, limit)
}

// 👉 Trae director de UNA película
const fetchDirector = async (movieId) => {
  const res = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)

  if (!res.ok) return null

  const data = await res.json()

  const director = data.crew.find((p) => p.job === "Director")

  return {
    name: director.name,
    image: director.profile_path ? `https://image.tmdb.org/t/p/w185${director.profile_path}` : null,
  }
}

// 👉 TRAE TODO: Pool grande + directores
export const getMoviesWithDirectors = async (limit = 150) => {
  const pool = await fetchMoviePool(limit)

  // Hacemos los fetch de los directores EN PARALELO
  const moviesWithDirectors = await Promise.all(
    pool.map(async (movie) => {
      const director = await fetchDirector(movie.id)

      if (!director) return null

      return {
        ...movie,
        director,
      }
    }),
  )

  // Filtramos las que NO tienen director
  return moviesWithDirectors.filter((m) => m !== null)
}
