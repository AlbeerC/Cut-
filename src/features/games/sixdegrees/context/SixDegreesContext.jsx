import { createContext, useContext, useState } from "react"
import { actorsPool } from "../api/actorsPool"

const SixDegreesContext = createContext(null)

export const SixDegreesProvider = ({ children }) => {
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY

  // Estados del juego
  const [actorA, setActorA] = useState(null)
  const [actorB, setActorB] = useState(null)
  const [chain, setChain] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  // Función para inicializar el juego con dos actores
  const initializeGame = (startActor, endActor) => {
    setActorA(startActor)
    setActorB(endActor)
    setChain([{ actor: startActor, movie: null }])
    setSearchQuery("")
    setSearchResults([])
    setGameWon(false)
    setErrorMessage("")
  }

  // Función para seleccionar actores aleatoriamente de una pool
  const selectRandomActors = async () => {
    try {

      const shuffled = [...actorsPool].sort(() => Math.random() - 0.5)
      const actor1Id = shuffled[0].id
      const actor2Id = shuffled[1].id

      // Obtener datos completos de TMDB
      const [response1, response2] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/person/${actor1Id}?api_key=${TMDB_API_KEY}&language=es-ES`),
        fetch(`https://api.themoviedb.org/3/person/${actor2Id}?api_key=${TMDB_API_KEY}&language=es-ES`),
      ])

      const [data1, data2] = await Promise.all([response1.json(), response2.json()])

      const startActor = {
        id: data1.id,
        name: data1.name,
        profile_path: data1.profile_path,
      }

      const endActor = {
        id: data2.id,
        name: data2.name,
        profile_path: data2.profile_path,
      }

      initializeGame(startActor, endActor)
    } catch (error) {
      console.log("[v0] Error selecting random actors:", error)
    }
  }

  // Búsqueda de actores
  const handleSearch = async (query) => {
    setSearchQuery(query)
    setErrorMessage("")

    if (query.length < 2) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/person?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=es-ES`,
      )
      const data = await response.json()
      setSearchResults(data.results?.slice(0, 5) || [])
    } catch (error) {
      console.log("[v0] Error searching actors:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  // Encontrar película compartida entre dos actores
  const findSharedMovie = async (actor1Id, actor2Id) => {
    try {
      const [response1, response2] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/person/${actor1Id}/movie_credits?api_key=${TMDB_API_KEY}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/person/${actor2Id}/movie_credits?api_key=${TMDB_API_KEY}&language=en-US`),
      ])

      const [data1, data2] = await Promise.all([response1.json(), response2.json()])
      const movies1 = data1.cast || []
      const movies2 = data2.cast || []

      const shared = movies1.find((m1) => movies2.some((m2) => m2.id === m1.id))

      return shared
        ? {
            id: shared.id,
            title: shared.title,
            year: shared.release_date?.split("-")[0] || "N/A",
          }
        : null
    } catch (error) {
      console.log("[v0] Error finding shared movie:", error)
      return null
    }
  }

  // Seleccionar un actor y validar conexión
  const handleSelectActor = async (selectedActor) => {
    setIsValidating(true)
    setErrorMessage("")
    setSearchQuery("")
    setSearchResults([])

    const lastActor = chain[chain.length - 1].actor

    // Verificar si ya está en la cadena
    if (chain.some((c) => c.actor.id === selectedActor.id)) {
      setErrorMessage("Este actor ya está en la cadena")
      setIsValidating(false)
      return
    }

    // Buscar película compartida
    const sharedMovie = await findSharedMovie(lastActor.id, selectedActor.id)

    if (!sharedMovie) {
      setErrorMessage(`${selectedActor.name} no tiene películas en común con ${lastActor.name}`)
      setIsValidating(false)
      return
    }

    // Agregar a la cadena
    const newLink = {
      actor: selectedActor,
      movie: sharedMovie,
    }
    setChain([...chain, newLink])

    // Verificar si llegamos al objetivo
    if (selectedActor.id === actorB?.id) {
      setGameWon(true)
    }

    setIsValidating(false)
  }

  // Deshacer último paso
  const handleUndo = () => {
    if (chain.length > 1) {
      setChain(chain.slice(0, -1))
      setGameWon(false)
      setErrorMessage("")
    }
  }

  // Reiniciar juego
  const handleReset = () => {
    if (actorA && actorB) {
      initializeGame(actorA, actorB)
    }
  }

  const value = {
    actorA,
    actorB,
    chain,
    searchQuery,
    searchResults,
    isSearching,
    isValidating,
    gameWon,
    errorMessage,
    initializeGame,
    selectRandomActors,
    handleSearch,
    handleSelectActor,
    handleUndo,
    handleReset,
  }

  return <SixDegreesContext.Provider value={value}>{children}</SixDegreesContext.Provider>
}

export const useSixDegrees = () => {
  const context = useContext(SixDegreesContext)
  if (!context) {
    throw new Error("useSixDegrees must be used within a SixDegreesProvider")
  }
  return context
}
