import { createContext, useContext, useEffect, useState } from "react"

const TimelineContext = createContext()

export default function TimelineProvider({ children }) {
  const [moviesPool, setMoviesPool] = useState([])
  const [rounds, setRounds] = useState(5)
  const [currentRound, setCurrentRound] = useState(1)
  const [options, setOptions] = useState([])
  const [correctOrder, setCorrectOrder] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [roundResult, setRoundResult] = useState(null)
  const [resultsHistory, setResultsHistory] = useState([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [currentCombo, setCurrentCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)

  useEffect(() => {
    if (moviesPool?.length > 0) {
      generateRound()
    }
  }, [moviesPool])

  const generateRound = () => {
    setIsLoading(true)

    const selected = pickRandomMovies(moviesPool, 4)

    const sorted = [...selected].sort((a, b) => Number(a.release_date.slice(0, 4)) - Number(b.release_date.slice(0, 4)))

    const shuffled = shuffleArray(selected)

    setCorrectOrder(sorted)
    setOptions(shuffled)
    setRoundResult(null)
    setIsLoading(false)
  }

  const confirmRound = () => {
    const sorted = [...correctOrder]
    const result = options.map((movie, index) => {
      const correctPos = sorted.findIndex((m) => m.id === movie.id) + 1
      const isCorrect = correctPos === index + 1
      return {
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        year: movie.release_date?.slice(0, 4),
        rating: movie.vote_average,
        userPosition: index + 1,
        correctPosition: correctPos,
        isCorrect,
      }
    })

    const correctCount = result.filter((r) => r.isCorrect).length

    let roundPoints = 0
    let comboBonus = 0

    // Base points: 10 per correct position
    roundPoints = correctCount * 10

    // Perfect round bonus
    if (correctCount === 4) {
      roundPoints += 20 // Total 60 points for perfect
      const newCombo = currentCombo + 1
      setCurrentCombo(newCombo)
      if (newCombo > maxCombo) {
        setMaxCombo(newCombo)
      }
      // Combo multiplier: +5 points per combo level
      comboBonus = (newCombo - 1) * 5
      roundPoints += comboBonus
    } else {
      setCurrentCombo(0) // Break combo
    }

    const roundObj = {
      movies: result,
      correctCount,
      roundPoints,
      comboBonus,
      roundNumber: currentRound,
      isPerfect: correctCount === 4,
    }

    setRoundResult(roundObj)
    setResultsHistory((prev) => [...prev, roundObj])
    setTotalPoints((prev) => prev + roundPoints)

    return roundObj
  }

  const nextRound = () => {
    if (currentRound < rounds) {
      setCurrentRound((r) => r + 1)
      generateRound()
      setRoundResult(null)
    }
  }

  const resetGame = () => {
    setCurrentRound(1)
    setOptions([])
    setCorrectOrder([])
    setRoundResult(null)
    setResultsHistory([])
    setTotalPoints(0)
    setMoviesPool([])
    setIsLoading(true)
    setCurrentCombo(0)
    setMaxCombo(0)
  }

  const value = {
    moviesPool,
    setMoviesPool,
    rounds,
    setRounds,

    currentRound,
    options,
    setOptions,
    correctOrder,
    isLoading,

    roundResult,
    resultsHistory,
    totalPoints,
    currentCombo,
    maxCombo,

    generateRound,
    confirmRound,
    nextRound,
    resetGame,

    isLastRound: currentRound === rounds,
  }
  return <TimelineContext.Provider value={value}>{children}</TimelineContext.Provider>
}

export const useTimelineContext = () => useContext(TimelineContext)

// Utils
const pickRandomMovies = (list, amount) => {
  const used = new Set()
  const result = []

  while (result.length < amount) {
    const i = Math.floor(Math.random() * list.length)
    if (!used.has(i)) {
      used.add(i)
      result.push(list[i])
    }
  }
  return result
}

const shuffleArray = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5)
}
