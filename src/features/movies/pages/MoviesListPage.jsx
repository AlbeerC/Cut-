import { Button } from "@/components/ui/button";
import MoviesList from "../components/MoviesList";
import { useApi } from "../context/ApiContext";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function MoviesListPage() {
  const { fetchMovies, movies, setMovies, error, loading } = useApi();
  const [searchParams, setSearchParams] = useSearchParams();

  const endpoint = searchParams.get("endpoint") || "top_rated";
  const page = Number(searchParams.get("page")) || 1;

  const [prevEndpoint, setPrevEndpoint] = useState(endpoint);

  useEffect(() => {
    if (prevEndpoint !== endpoint) {
      // Se cambió manualmente el filtro → limpiar resultados
      setMovies({ results: [], page: 0, total_pages: 0 });
      fetchMovies(endpoint, 1);
    }
    setPrevEndpoint(endpoint);
  }, [endpoint]);

  useEffect(() => {
    if (prevEndpoint !== endpoint) {
      // Se cambió manualmente el filtro → limpiar resultados
      setMovies({ results: [], page: 0, total_pages: 0 });
      fetchMovies(endpoint, 1);
    }
    setPrevEndpoint(endpoint);
  }, [endpoint]);

  useEffect(() => {
    fetchMovies(endpoint, page);
  }, [endpoint, page]);

  const handleFilterChange = (newEndpoint) => {
    setSearchParams({ endpoint: newEndpoint, page: 1 });
  };

  const handleLoadMore = () => {
    setSearchParams({ endpoint, page: page + 1 });
  };

  if (loading && movies.length === 0) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-6 pt-20">
      {/* Filtros */}
      <div className="flex gap-4">
        {["popular", "top_rated", "upcoming"].map((f) => (
          <Button
            key={f}
            onClick={() => handleFilterChange(f)}
            className={`px-4 py-2 rounded text-white cursor-pointer font-semibold ${
              f === endpoint ? "bg-primary" : "bg-gray-700"
            }`}
          >
            {f.replace("_", " ").toUpperCase()}
          </Button>
        ))}
      </div>

      {/* Lista de películas */}
      <MoviesList movies={movies} />

      {/* Botón Load more */}
      {!loading && (
        <button
          onClick={handleLoadMore}
          className="px-6 py-2 bg-primary rounded hover:bg-primary/80"
        >
          Load more
        </button>
      )}
    </div>
  );
}
