const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getMoviesByDecade = async (start, end, limit = 60) => {
  let movies = []
  let page = 1

  while (movies.length < limit) {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_count.desc&primary_release_date.gte=${start}-01-01&primary_release_date.lte=${end}-12-31&page=${page}`
    )

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    const data = await response.json()

    // Si ya no hay más resultados, cortamos
    if (!data.results || data.results.length === 0) break

    movies = [...movies, ...data.results]
    page++

    // Seguridad por si la API no alcanza
    if (page > data.total_pages) break
  }

  return movies.slice(0, limit)
}
