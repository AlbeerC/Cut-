import { Button } from "@/components/ui/button";
import MoviesList from "../components/MoviesList";
import { useApi } from "../context/ApiContext";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import SearchMovieInput from "../components/SearchMovieInput";

export default function MoviesListPage() {
  const {
    fetchMovies,
    movies,
    setMovies,
    error,
    loading,
    currentEndpoint,
    currentPage,
  } = useApi();
  const [searchParams, setSearchParams] = useSearchParams();

  const endpoint = searchParams.get("endpoint") || currentEndpoint;
  const page = Number(searchParams.get("page")) || currentPage;

  useEffect(() => {
    if (!searchParams.get("endpoint") && currentEndpoint) {
      setSearchParams(
        { endpoint: currentEndpoint, page: currentPage },
        { replace: true }
      );
    }
  }, []);

  const [prevEndpoint, setPrevEndpoint] = useState(endpoint);

  useEffect(() => {
    if (prevEndpoint !== endpoint) {
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

  if (error) return <p>{error}</p>;

  return (
    <div className="space-y-6 pt-20">
      {/* Search bar */}
      <SearchMovieInput />

      {/* Filtros */}
      <div className="flex gap-4 justify-center pb-10">
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
      <MoviesList movies={movies.results} loading={loading} />

      {/* Botón Load more */}
      {!loading && (
        <div className="flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-primary rounded hover:bg-primary/80 cursor-pointer"
          >
            Cargar más
          </button>
        </div>
      )}
    </div>
  );
}
