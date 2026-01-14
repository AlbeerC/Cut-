import { createContext, useContext, useState } from "react"

const MovieCluesContext = createContext()

export default function MovieCluesProvider({ children }) {
  const [rounds, setRounds] = useState(5)
  const [currentRound, setCurrentRound] = useState(1)
  const [moviePool, setMoviePool] = useState([])
  const [roundData, setRoundData] = useState([])
  const [score, setScore] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0)

  // Current round state
  const [currentMovie, setCurrentMovie] = useState(null)
  const [revealedClues, setRevealedClues] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [roundPoints, setRoundPoints] = useState(0)

  const maxClues = 4 // Poster borroso → menos borroso → claro → + año

  // Generate all rounds at once
  const generateRounds = (movies, numRounds) => {
    if (!movies || movies.length < numRounds) {
      console.error("[v0] No hay suficientes películas para generar rondas")
      return false
    }

    const shuffled = [...movies].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, numRounds)

    setRoundData(selected)
    setCurrentMovie(selected[0])
    setRevealedClues(1)
    console.log("[v0] Rondas generadas:", selected.length)
    return true
  }

  // Search movies via TMDB API
  const searchMovies = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([])
      return
    }

    try {
      const API_KEY = import.meta.env.VITE_TMDB_API_KEY
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`,
      )
      const data = await response.json()
      setSearchResults(data.results.slice(0, 8)) // Limit to 8 results
    } catch (error) {
      console.error("[v0] Error searching movies:", error)
      setSearchResults([])
    }
  }

  // Select movie from search results
  const selectMovieFromSearch = (movie) => {
    setSelectedMovie(movie)
    setSearchQuery(movie.title)
    setSearchResults([])
  }

  // Confirm answer
  const confirmAnswer = () => {
    if (!selectedMovie || !currentMovie) return

    const isCorrect = selectedMovie.id === currentMovie.id
    const newAttempts = attempts + 1

    // Points calculation: more clues revealed = less points
    // 100 pts for 1 clue, 75 for 2, 50 for 3, 25 for 4+
    const pointsMap = { 1: 100, 2: 75, 3: 50, 4: 25 }
    const earnedPoints = isCorrect ? pointsMap[revealedClues] || 10 : 0

    setAttempts(newAttempts)
    setRoundPoints(earnedPoints)
    setShowResult(true)

    if (isCorrect) {
      setScore((prev) => prev + 1)
      setTotalPoints((prev) => prev + earnedPoints)
    }
  }

  // Reveal next clue (wrong answer)
  const revealNextClue = () => {
    if (revealedClues < maxClues) {
      setRevealedClues((prev) => prev + 1)
      setShowResult(false)
      setSelectedMovie(null)
      setSearchQuery("")
      setAttempts((prev) => prev + 1)
    } else {
      // No more clues, force next round
      setShowResult(true)
    }
  }

  // Next round
  const nextRound = () => {
    if (currentRound < roundData.length) {
      const nextRoundIndex = currentRound
      setCurrentRound((prev) => prev + 1)
      setCurrentMovie(roundData[nextRoundIndex])
      setRevealedClues(1)
      setSearchQuery("")
      setSearchResults([])
      setSelectedMovie(null)
      setShowResult(false)
      setAttempts(0)
      setRoundPoints(0)
    }
  }

  // Reset game
  const resetGame = () => {
    setCurrentRound(1)
    setScore(0)
    setTotalPoints(0)
    setMoviePool([])
    setRoundData([])
    setCurrentMovie(null)
    setRevealedClues(1)
    setSearchQuery("")
    setSearchResults([])
    setSelectedMovie(null)
    setShowResult(false)
    setAttempts(0)
    setRoundPoints(0)
  }

  const currentRoundData = roundData[currentRound - 1] || null

  const value = {
    rounds,
    setRounds,
    currentRound,
    moviePool,
    setMoviePool,
    roundData,
    currentRoundData,
    score,
    totalPoints,

    // Current round state
    currentMovie,
    revealedClues,
    maxClues,
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedMovie,
    showResult,
    attempts,
    roundPoints,

    // Methods
    generateRounds,
    searchMovies,
    selectMovieFromSearch,
    confirmAnswer,
    revealNextClue,
    nextRound,
    resetGame,
  }

  return <MovieCluesContext.Provider value={value}>{children}</MovieCluesContext.Provider>
}

export const useMovieCluesContext = () => useContext(MovieCluesContext)
