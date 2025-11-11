const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getReviewsById = async (id) => {
    const res = await fetch(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&language=en-US`);

    if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();

    return data;
}