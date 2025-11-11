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
  };
};

export const getMovieByid = async (id) => {
  const [esRes, enRes] = await Promise.all([
    fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,images&language=es-MX`
    ),
    fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos&language=en-US`
    ),
  ]);

  if (!esRes.ok || !enRes.ok) {
    console.error("Movie fetch failed:", esRes.status, enRes.status)
    throw new Error(`HTTP Error: ${esRes.status} / ${enRes.status}`);
  }

  const [esData, enData] = await Promise.all([esRes.json(), enRes.json()]);

  return {
    ...esData,
    title: enData.title,
    original_title: enData.original_title,
    poster_path: enData.poster_path,
    videos: enData.videos,
  }
};


export const getMoviesByRecommendation = async (id) => {

  const response = await fetch(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US`);
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data = await response.json();

  const slicedResults = data.results.slice(0, 18);

  return slicedResults;
}