import { createContext, useContext, useState } from "react"
import { generateDirectorRounds } from "../utils/generateDirectorRounds"

const DirectorContext = createContext()

export default function DirectorProvider({ children }) {
  const [rounds, setRounds] = useState(5)
  const [currentRound, setCurrentRound] = useState(1)
  const [moviePool, setMoviePool] = useState([])
  const [roundData, setRoundData] = useState([])
  const [selectedOption, setSelectedOption] = useState(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const setConfig = (value) => setRounds(value)

  const loadPool = (movies) => {
    setMoviePool(movies)
  }

  const generateRounds = async (movies, numRounds) => {

    if (!movies || movies.length === 0) {
      return false
    }

    const generated = generateDirectorRounds(movies, numRounds)

    if (generated.length === 0) {
      return false
    }
    
    setRoundData(generated)
    setRounds(generated.length)
    return true
  }

  const selectOption = (option) => {
    if (showResult) return
    setSelectedOption(option)
  }

  const confirmAnswer = () => {
    if (!selectedOption) return

    const current = roundData[currentRound - 1]
    if (selectedOption === current.correctDirector.name) {
      setScore((prev) => prev + 1)
    }
    setShowResult(true)
  }

  const nextRound = () => {
    setShowResult(false)
    setSelectedOption(null)

    if (currentRound < roundData.length) {
      setCurrentRound((prev) => prev + 1)
    }
  }

  const resetGame = () => {
    setCurrentRound(1)
    setScore(0)
    setShowResult(false)
    setSelectedOption(null)
    setRoundData([])
    setMoviePool([])
  }

  const currentRoundData = roundData[currentRound - 1] || null

  const value = {
    rounds,
    setRounds,
    currentRound,
    moviePool,
    roundData,
    currentRoundData,
    selectedOption,
    score,
    showResult,

    setConfig,
    loadPool,
    generateRounds,
    selectOption,
    confirmAnswer,
    nextRound,
    resetGame,
  }

  return <DirectorContext.Provider value={value}>{children}</DirectorContext.Provider>
}

export const useDirectorContext = () => useContext(DirectorContext)