import { useParams } from "react-router-dom"
import MoviesList from "../components/MoviesList"
import { useFetch } from "../hooks/useFetch"
import { getMoviesBySearch } from "../api/search"

export default function MoviesSearchListPage() {
  const { query } = useParams()

  const { data: results, error, loading } = useFetch(() => getMoviesBySearch(query), [query])

  if (error) return <p>{error}</p>

  return (
    <div className="max-w-6xl mx-auto px-4 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-center pt-8">
        Resultados para: <span className="text-primary">“{query}”</span>
      </h1>

      <MoviesList movies={results} loading={loading} />

      {!loading && results?.length === 0 && (
        <div className="max-w-6xl mx-auto px-4 pt-20 min-h-[50vh]">
          <h1 className="text-3xl font-bold mb-6 text-center pt-8">
            No se encontraron resultados para: <span className="text-primary">“{query}”</span>
          </h1>
        </div>
      )}
    </div>
  )
}
