import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import MoviesList from "../components/MoviesList"

export default function MoviesSearchListPage() {
  const { query } = useParams()
  const apiKey = import.meta.env.VITE_TMDB_API_KEY
  const [results, setResults] = useState([])
  const [person, setPerson] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query) return
    setLoading(true)
    setError(null)
    setResults([])
    setPerson(null)

const fetchSearch = async () => {
  try {
    setLoading(true)
    setError(null)

    // 1️⃣ Buscar películas
    const movieRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&include_adult=false`
    )
    const movieData = await movieRes.json()
    let movieResults = movieData.results || []

    // 2️⃣ Buscar personas
    const personRes = await fetch(
      `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}`
    )
    const personData = await personRes.json()
    const personFound = personData.results?.[0]

    let combinedResults = [...movieResults]

    // 3️⃣ Si se encontró una persona, traer sus créditos
    if (personFound) {
      const creditsRes = await fetch(
        `https://api.themoviedb.org/3/person/${personFound.id}/movie_credits?api_key=${apiKey}&language=en-US`
      )
      const creditsData = await creditsRes.json()

      // Separar dirigidas y actuadas
      const directed = creditsData.crew.filter((c) => c.job === "Director")
      const acted = creditsData.cast

      // Combinar todo (sin duplicar IDs)
      const combinedMap = new Map()
      ;[...movieResults, ...directed, ...acted].forEach((m) => combinedMap.set(m.id, m))

      combinedResults = Array.from(combinedMap.values())

      setPerson(personFound)
    }

    if (combinedResults.length === 0) {
      setError("No se encontraron resultados.")
      return
    }

    setResults(combinedResults)
  } catch (err) {
    setError(err.message || "Error al buscar.")
  } finally {
    setLoading(false)
  }
}

    fetchSearch()
  }, [query])

  if (error) return <p>{error}</p>

  return (
    <div className="max-w-6xl mx-auto px-4 pt-20">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Resultados para: <span className="text-primary">“{query}”</span>
      </h1>

      <MoviesList movies={results} loading={loading} />
    </div>
  )
}
