import { createContext, useContext, useState, useRef } from "react"
import { actorsPool } from "../api/actorsPool"
import { finishSixDegreesGame } from "../db/points.db"
import { useAuth } from "@/features/auth/context/AuthContext"

const SixDegreesContext = createContext(null)

const getApiKey = () => import.meta.env.VITE_TMDB_API_KEY

export const SixDegreesProvider = ({ children }) => {
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
  const [gameLost, setGameLost] = useState(false)
  const [lossReason, setLossReason] = useState(null)

  const [gameId, setGameId] = useState(null)
  const { user } = useAuth()

  // Estados de configuración del juego
  const [config, setConfig] = useState({
    maxSteps: 6,
    timeLimit: null,
    difficulty: "medium",
  })
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [undoCount, setUndoCount] = useState(0)
  const [optimalPath, setOptimalPath] = useState(null)
  const [score, setScore] = useState(0)
  const timerRef = useRef(null)
  const [initialTime, setInitialTime] = useState(null)

  // Función para inicializar el juego con dos actores
  const initializeGame = (startActor, endActor) => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    setActorA(startActor)
    setActorB(endActor)
    setChain([{ actor: startActor, movie: null }])
    setSearchQuery("")
    setSearchResults([])
    setGameWon(false)
    setGameLost(false)
    setLossReason(null)
    setErrorMessage("")
    setHintsUsed(0)
    setUndoCount(0)
    setOptimalPath(null)
    setScore(0)
    setTimeRemaining(config.timeLimit)
    setInitialTime(config.timeLimit)
  }

  const selectRandomActors = async () => {
    try {
      const popularActors = actorsPool
      const shuffled = [...popularActors].sort(() => Math.random() - 0.5)

      for (let i = 0; i < Math.min(5, shuffled.length - 1); i++) {
        const actor1Id = shuffled[i].id
        const actor2Id = shuffled[i + 1].id

        try {
          const apiKey = getApiKey()
          const [response1, response2] = await Promise.all([
            fetch(`https://api.themoviedb.org/3/person/${actor1Id}?api_key=${apiKey}`),
            fetch(`https://api.themoviedb.org/3/person/${actor2Id}?api_key=${apiKey}`),
          ])

          if (!response1.ok || !response2.ok) {
            continue
          }

          const [data1, data2] = await Promise.all([response1.json(), response2.json()])

          if (data1.known_for_department !== "Acting" || data2.known_for_department !== "Acting") {
            continue
          }

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
          return
        } catch (error) {
          console.error("Error fetching actor pair:", error)
          continue
        }
      }

      throw new Error("No se pudo encontrar un par válido de actores")
    } catch (error) {
      console.error("Error selecting random actors:", error)
      setErrorMessage("Error al cargar actores. Por favor, intenta de nuevo.")
    }
  }

  const handleSearch = async (query) => {
    setSearchQuery(query)

    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const apiKey = getApiKey()
      const response = await fetch(
        `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(query)}&api_key=${apiKey}`,
      )

      if (!response.ok) {
        throw new Error("Error en la búsqueda")
      }

      const data = await response.json()

      const actorsOnly = (data.results || [])
        .filter((person) => person.known_for_department === "Acting")
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 8)

      setSearchResults(actorsOnly)
    } catch (error) {
      console.error("Error searching actors:", error)
      setSearchResults([])
      setErrorMessage("Error al buscar actores. Por favor, intenta de nuevo.")
    } finally {
      setIsSearching(false)
    }
  }

  const findSharedMovie = async (actor1Id, actor2Id) => {
    try {
      const apiKey = getApiKey()
      const [response1, response2] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/person/${actor1Id}/movie_credits?api_key=${apiKey}`),
        fetch(`https://api.themoviedb.org/3/person/${actor2Id}/movie_credits?api_key=${apiKey}`),
      ])

      if (!response1.ok || !response2.ok) {
        throw new Error("Error fetching movie credits")
      }

      const [data1, data2] = await Promise.all([response1.json(), response2.json()])
      const movies1 = data1.cast || []
      const movies2 = data2.cast || []

      const sharedMovies = movies1
        .filter((m1) => movies2.some((m2) => m2.id === m1.id))
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))

      const bestShared = sharedMovies[0]

      return bestShared
        ? {
            id: bestShared.id,
            title: bestShared.title,
            year: bestShared.release_date?.split("-")[0] || "N/A",
            popularity: bestShared.popularity || 0,
          }
        : null
    } catch (error) {
      console.error("Error finding shared movie:", error)
      throw error
    }
  }

  const handleSelectActor = async (selectedActor) => {
    setIsValidating(true)
    setSearchQuery("")
    setSearchResults([])

    const lastActor = chain[chain.length - 1].actor

    if (chain.some((c) => c.actor.id === selectedActor.id)) {
      setErrorMessage("Este actor ya está en la cadena")
      setIsValidating(false)
      return
    }

    try {
      const sharedMovie = await findSharedMovie(lastActor.id, selectedActor.id)

      if (!sharedMovie) {
        setErrorMessage(`${selectedActor.name} no tiene películas en común con ${lastActor.name}`)
        setIsValidating(false)
        return
      }

      const newLink = {
        actor: selectedActor,
        movie: sharedMovie,
      }

      const newChain = [...chain, newLink]
      setChain(newChain)
      setErrorMessage("")

      if (selectedActor.id === actorB?.id) {
        setGameWon(true)

        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
        const finalScore = calculateScore(newChain.length - 1, hintsUsed, undoCount, timeRemaining, initialTime, config.maxSteps)
        setScore(finalScore)

        // Finish game
        if (gameId) {
          await finishSixDegreesGame({
            gameId,
            userId: user.id,
            score: finalScore,
          })
        }
      }
    } catch (error) {
      setErrorMessage("Error al validar la conexión. Por favor, intenta de nuevo.")
    } finally {
      setIsValidating(false)
    }
  }

  const handleUndo = () => {
    if (chain.length > 1) {
      setChain(chain.slice(0, -1))
      setGameWon(false)
      setErrorMessage("")
      setUndoCount(undoCount + 1)
    }
  }

  const handleReset = () => {
    if (actorA && actorB) {
      initializeGame(actorA, actorB)
    }
  }

  const handleGiveUp = async () => {
    setGameLost(true)
    setLossReason("gaveup")
    setGameId(null)
    await finishSixDegreesGame({
      gameId,
      userId: user.id,
      score: 0,
    })

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const useHint = async () => {
    if (hintsUsed >= 3) {
      setErrorMessage("Ya usaste todos los hints disponibles")
      return
    }

    const lastActor = chain[chain.length - 1].actor

    try {
      if (hintsUsed === 0) {
        const sharedMovie = await findSharedMovie(lastActor.id, actorB.id)
        if (sharedMovie) {
          setErrorMessage(`💡 Pista: Busca actores de "${sharedMovie.title}" (${sharedMovie.year})`)
        } else {
          const apiKey = getApiKey()
          const response = await fetch(
            `https://api.themoviedb.org/3/person/${lastActor.id}/movie_credits?api_key=${apiKey}`,
          )
          const data = await response.json()
          const movies = data.cast || []
          if (movies.length > 0) {
            const popularMovie = movies.sort((a, b) => (b.popularity || 0) - (a.popularity || 0))[0]
            setErrorMessage(`💡 Pista: Busca actores que trabajaron con ${lastActor.name} en "${popularMovie.title}"`)
          }
        }
      } else if (hintsUsed === 1) {
        const apiKey = getApiKey()
        const response = await fetch(`https://api.themoviedb.org/3/person/${actorB.id}/movie_credits?api_key=${apiKey}`)
        const data = await response.json()
        const movies = (data.cast || []).sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 3)
        const movieTitles = movies.map((m) => m.title).join(", ")
        setErrorMessage(`💡 Pista: ${actorB.name} actuó en: ${movieTitles}`)
      } else if (hintsUsed === 2) {
        setErrorMessage(
          `💡 Pista: Busca actores famosos que hayan trabajado tanto con ${lastActor.name} como con ${actorB.name}`,
        )
      }

      setHintsUsed(hintsUsed + 1)
    } catch (error) {
      setErrorMessage("💡 Pista: Busca actores muy conocidos de Hollywood que trabajen en muchas películas")
      setHintsUsed(hintsUsed + 1)
    }
  }

  const calculateScore = (steps, hints, undos, timeLeft, totalTime, optimalSteps) => {
    const getBaseScore = () => {
      if (config.difficulty === "easy") {
        return 200
      } else if (config.difficulty === "medium") {
        return 300
      } else {
        return 400
      }
    }
    const BASE_SCORE = getBaseScore()

    let finalScore = BASE_SCORE

    const extraSteps = Math.max(0, steps - optimalSteps)
    finalScore -= extraSteps * 50

    finalScore -= hints * 25

    finalScore -= undos * 10

    if (extraSteps === 0) {
      finalScore += 150
    }

    if (steps <= 2) {
      finalScore += 50
    }

    if (hints === 0) {
      finalScore += 50
    }

    if (totalTime && timeLeft > 0) {
      const percentageLeft = (timeLeft / totalTime) * 100
      if (percentageLeft > 50) {
        finalScore += 20
      }
    }

    return Math.max(0, finalScore)
  }

  const updateConfig = (newConfig) => {
    setConfig({ ...config, ...newConfig })
  }

  const startTimer = (timerRefParam) => {
    timerRef.current = timerRefParam
  }

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
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
    gameLost,
    lossReason,
    errorMessage,
    config,
    timeRemaining,
    hintsUsed,
    undoCount,
    optimalPath,
    score,
    initialTime,
    initializeGame,
    selectRandomActors,
    handleSearch,
    handleSelectActor,
    handleUndo,
    handleReset,
    handleGiveUp,
    useHint,
    updateConfig,
    setTimeRemaining,
    startTimer,
    stopTimer,
    setGameLost,
    setLossReason,
    setGameId
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
