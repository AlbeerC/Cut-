const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getMoviesBySearch = async (query) => {

  // 1️⃣ Search for movies
  const movieRes = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      query
    )}&include_adult=false`
  );
  const movieData = await movieRes.json();
  let movieResults = movieData.results || [];

  // 2️⃣ Search for people
  const personRes = await fetch(
    `${BASE_URL}/search/person?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      query
    )}`
  );
  const personData = await personRes.json();
  const personFound = personData.results?.[0];

  let combinedResults = [...movieResults];

  if (personFound) {
    const creditsRes = await fetch(
      `${BASE_URL}/person/${personFound.id}/combined_credits?api_key=${API_KEY}&language=en-US`
    );
    const creditsData = await creditsRes.json();

    // Separate directed and acted
    const directed = creditsData.crew.filter((c) => c.job === "Director");
    const acted = creditsData.cast;

    // Combine all results (without duplicating IDs)
    const combinedMap = new Map();
    [...movieResults, ...directed, ...acted].forEach((m) =>
      combinedMap.set(m.id, m)
    );

    combinedResults = Array.from(combinedMap.values());
  }

  return combinedResults;
};
