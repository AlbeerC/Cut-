import { createContext, useContext, useState } from "react";

const ApiContext = createContext();

export default function ApiProvider({ children }) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (endpoint, page) => {
    setLoading(true);
    setError(null);

    try {
      // Pedimos ambas versiones en paralelo
      const [esRes, enRes] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${apiKey}&language=es-MX&page=${page}`
        ),
        fetch(
          `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${apiKey}&language=en-US&page=${page}`
        ),
      ]);

      if (!esRes.ok || !enRes.ok)
        throw new Error(`HTTP Error: ${esRes.status} / ${enRes.status}`);

      const [esData, enData] = await Promise.all([esRes.json(), enRes.json()]);

      // Mezclamos los resultados: mismos índices en results[]
      const combinedResults = esData.results.map((movie, i) => ({
        ...movie,
        title: enData.results[i]?.title || movie.title,
        original_title:
          enData.results[i]?.original_title || movie.original_title,
        poster_path: enData.results[i]?.poster_path || movie.poster_path,
      }));

      // Devolvemos el objeto completo (manteniendo paginación y metadata)
      setMovies((prev) =>
        page === 1
          ? {
              ...esData,
              results: combinedResults, // si es la primera página, reemplazás
            }
          : {
              ...esData,
              results: [
                ...(prev?.results || []), // acumulás las anteriores
                ...combinedResults, // agregás las nuevas
              ],
            }
      );
    } catch (error) {
      setError(error.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    fetchMovies,
    movies, setMovies,
    error,
    loading,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const context = useContext(ApiContext);

  if (!context) {
    throw new Error("UseTheme must be used inside <ApiProvider>");
  }

  return context;
}
