const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const filterOfficialMovies = (movies) => {
    return movies
      .filter(
        (movie) =>
          movie.media_type === "movie" ||
          (!movie.media_type && movie.title)
      )
      .filter(
        (movie) =>
          !movie.genre_ids?.includes(99) &&
          !movie.genre_ids?.includes(10770) &&
          movie.vote_count > 50 &&
          movie.release_date &&
          new Date(movie.release_date) < new Date()
      ).sort((a, b) => b.vote_average - a.vote_average);
}


export const getPersonMoviesById = async (id, role) => {
    const res = await fetch(`${BASE_URL}/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`);

    if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();

    const rawMovies =
        role === "actor"
        ? data.cast
        : data.crew.filter((c) => c.job === "Director");

    const filtered = filterOfficialMovies(rawMovies);

    return filtered;
}


export const getPersonInfoById = async (id) => {
    const res = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}&language=es-ES`);

    if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();

    return data;
}