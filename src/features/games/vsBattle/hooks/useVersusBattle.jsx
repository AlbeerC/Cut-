import { useState, useEffect } from "react"

function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function useVersusBattle(moviesPool) {
  const [availableMovies, setAvailableMovies] = useState([])
  const [currentPair, setCurrentPair] = useState([])
  const [winner, setWinner] = useState(null)
  const [finalWinner, setFinalWinner] = useState(null)

  // Cuando llega el pool, lo barajamos e inicializamos el primer duelo
  useEffect(() => {
    if (!moviesPool || moviesPool.length < 2) return
    
    const shuffled = shuffleArray(moviesPool)
    // Inicializamos el primer par inmediatamente
    setCurrentPair(shuffled.slice(0, 2))
    setAvailableMovies(shuffled.slice(2))
  }, [moviesPool])

  const handleChoice = (chosenMovie) => {
    setWinner(chosenMovie)

    setTimeout(() => {
      if (availableMovies.length === 0) {
        // Fin del juego
        setFinalWinner(chosenMovie)
        setCurrentPair([])
        return
      }

      // Tomamos la próxima película del pool
      const nextOpponent = availableMovies[0]
      setCurrentPair([chosenMovie, nextOpponent])
      setAvailableMovies(prev => prev.slice(1))
      setWinner(null)
    }, 600)
  }

  return { currentPair, winner, finalWinner, handleChoice, availableMovies }
}