import { Button } from "@/components/ui/button";
import MoviesList from "../components/MoviesList";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchMovieInput from "../components/SearchMovieInput";
import { useFetch } from "../hooks/useFetch";
import { getMovies } from "../api/movies";
import { useMoviesContext } from "../context/MoviesContext";

export default function MoviesListPage() {
  const { moviesState, setMoviesState } = useMoviesContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const endpoint = searchParams.get("endpoint") || moviesState.endpoint;
  const page = Number(searchParams.get("page")) || moviesState.page;
  
  useEffect(() => {
    window.scrollTo(0, moviesState.scrollY || 0)
  }, [])

  useEffect(() => {
    if (!endpoint || !page)
      navigate(`/movies?endpoint=${moviesState.endpoint}&page=${moviesState.page}`, { replace: true })
  }, [endpoint, page, navigate])

  const { data: newData, error, loading } = useFetch(() => getMovies(endpoint, page), [endpoint, page]);

  useEffect(() => {
    if (!newData) return
    setMoviesState(prev => {
      const prevMovies = prev.movies || { results: [] }

      if (page === 1) {
        return { ...prev, movies: newData, page }
      }

      const prevCount = prevMovies.results.length
      const expectedCount = (page - 1) * 20
      if (prevCount >= expectedCount) return prev

      return {
        ...prev,
        movies: {
          ...newData,
          results: [...prevMovies.results, ...newData.results],
        },
        page
      }
    })
  }, [newData, page, endpoint])

  const handleFilterChange = (newEndpoint) => {
    setSearchParams({ endpoint: newEndpoint, page: 1 });
  };

  const handleLoadMore = async() => {
    const nextPage = page + 1
    const newData = await getMovies(endpoint, nextPage)
    
    setMoviesState(prev => ({
      ...prev,
      movies: {
        ...newData,
        results: [...(prev.movies?.results || []), ...newData.results],
      },
      page: nextPage,
    }))

    setSearchParams({ endpoint, page: nextPage })
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
      <MoviesList movies={moviesState.movies.results || []} loading={loading} />

      {/* Botón Load more */}
      {!loading && (
        <div className="flex justify-center pb-5">
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
