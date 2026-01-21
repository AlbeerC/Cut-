const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = "https://api.themoviedb.org/3"

export const getPoolMovies = async (limit = 300) => {
  let movies = []
  let page = 1

  while (movies.length < limit) {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US` +
      `&sort_by=popularity.desc` +
      `&vote_count.gte=3000` +
      `&include_adult=false` +
      `&page=${page}`
    )

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.results || data.results.length === 0) break

    movies.push(...data.results)
    page++

    if (page > data.total_pages) break
  }

  return movies.slice(0, limit)
}
