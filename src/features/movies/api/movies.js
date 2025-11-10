const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovies = async (endpoint, page = 1) => {
  const [esRes, enRes] = await Promise.all([
    fetch(
      `${BASE_URL}/movie/${endpoint}?api_key=${API_KEY}&language=es-MX&page=${page}`
    ),
    fetch(
      `${BASE_URL}/movie/${endpoint}?api_key=${API_KEY}&language=en-US&page=${page}`
    ),
  ]);

  if (!esRes.ok || !enRes.ok) {
    throw new Error(`HTTP Error: ${esRes.status} / ${enRes.status}`);
  }

  const [esData, enData] = await Promise.all([esRes.json(), enRes.json()]);

  // Combine results: same indexes in results[]
  const combinedResults = esData.results.map((movie, i) => ({
    ...movie,
    title: enData.results[i]?.title || movie.title,
    original_title: enData.results[i]?.original_title || movie.original_title,
    poster_path: enData.results[i]?.poster_path || movie.poster_path,
  }));

  return {
    ...esData,
    results: combinedResults,
  }
};
