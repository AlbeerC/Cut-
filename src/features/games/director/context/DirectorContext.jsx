import { createContext, useContext, useState } from "react";
import { generateDirectorRounds } from "../utils/generateDirectorRounds";

const DirectorContext = createContext();

export default function DirectorProvider({ children }) {
  const [rounds, setRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(1);
  const [moviePool, setMoviePool] = useState([]);
  const [roundData, setRoundData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const setConfig = (value) => setRounds(value);

  const loadPool = (movies) => setMoviePool(movies);

  const generateRounds = async () => {
    const generated = await generateDirectorRounds(moviePool, rounds);
    setRoundData(generated);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
  };

  const confirmAnswer = () => {
    const current = roundData[currentRound - 1];
    if (selectedOption === current.correctDirector) {
      setScore((prev) => prev + 1);
    }
    setShowResult(true);
  };

  const nextRound = () => {
    setShowResult(false);
    setSelectedOption(null);

    if (currentRound < rounds) {
      setCurrentRound((prev) => prev + 1);
    }
  };

  const resetGame = () => {
    setCurrentRound(1);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setRoundData([]);
  };

  const value = {
    rounds,
    currentRound,
    moviePool,
    roundData,
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
  };

  return (
    <DirectorContext.Provider value={value}>
      {children}
      </DirectorContext.Provider>
  );
}

export const useDirectorContext = () => useContext(DirectorContext);
