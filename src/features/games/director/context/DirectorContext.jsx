import { createContext, useContext, useState } from "react";
import { generateDirectorRounds } from "../utils/generateDirectorRounds";
import {
  startDirectorGame,
  addDirectorRound,
  finishDirectorGame,
} from "../db/points.db";
import { useAuth } from "@/features/auth/context/AuthContext";

const DirectorContext = createContext();

export default function DirectorProvider({ children }) {
  const [rounds, setRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(1);
  const [moviePool, setMoviePool] = useState([]);
  const [roundData, setRoundData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const { user } = useAuth();
  const [gameId, setGameId] = useState(null);

  const setConfig = (value) => setRounds(value);

  const loadPool = (movies) => {
    setMoviePool(movies);
  };

  const generateRounds = async (movies, numRounds) => {
    if (!movies || movies.length === 0) {
      return false;
    }

    const generated = generateDirectorRounds(movies, numRounds);

    if (generated.length === 0) {
      return false;
    }

    // 👉 Crear partida en DB
    const newGameId = await startDirectorGame(user.id);
    setGameId(newGameId);

    setRoundData(generated);
    setRounds(generated.length);
    return true;
  };

  const selectOption = (option) => {
    if (showResult) return;
    setSelectedOption(option);
  };

  const confirmAnswer = async () => {
    if (!selectedOption || showResult) return;

    const current = roundData[currentRound - 1];
    const isCorrect = selectedOption === current.correctDirector.name;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    // 👉 Guardar ronda
    if (gameId) {
      await addDirectorRound({
        gameId,
        roundNumber: currentRound,
        movieId: current.movie.id,
        result: isCorrect ? "correct" : "incorrect",
      });
    }

    // 👉 SI ES LA ÚLTIMA RONDA
    if (currentRound === roundData.length) {
      setGameFinished(true);

      if (gameId) {
        const finalScore = (isCorrect ? score + 1 : score) * 100;

        await finishDirectorGame({
          gameId,
          userId: user.id,
          score: finalScore,
        });
      }
    }

    setShowResult(true);
  };

  const nextRound = () => {
    setShowResult(false);
    setSelectedOption(null);
    setCurrentRound((prev) => prev + 1);
  };

  const resetGame = () => {
    setCurrentRound(1);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setRoundData([]);
    setMoviePool([]);
    setGameId(null);
  };

  const currentRoundData = roundData[currentRound - 1] || null;

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
    gameFinished,
  };

  return (
    <DirectorContext.Provider value={value}>
      {children}
    </DirectorContext.Provider>
  );
}

export const useDirectorContext = () => useContext(DirectorContext);
