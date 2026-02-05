import { createContext, useContext, useEffect, useState } from "react";
import {
  startTimelineGame,
  addTimelineRound,
  finishTimelineGame,
} from "../db/points.db";
import { useAuth } from "@/features/auth/context/AuthContext";
import { safeStartGame } from "../../utils/gameAuth";

const TimelineContext = createContext();

export default function TimelineProvider({ children }) {
  const [moviesPool, setMoviesPool] = useState([]);
  const [rounds, setRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(1);
  const [options, setOptions] = useState([]);
  const [correctOrder, setCorrectOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [roundResult, setRoundResult] = useState(null);
  const [resultsHistory, setResultsHistory] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [currentCombo, setCurrentCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  // States for db logic
  const { user } = useAuth();
  const [gameId, setGameId] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    const initGame = async () => {
      if (moviesPool?.length > 0 && !gameId) {
        setIsLoading(true);
        const newGameId = await safeStartGame({
          user,
          startGameFn: startTimelineGame,
        });
        setGameId(newGameId);
        generateRound();

        setIsLoading(false);
      }
    };

    initGame();
  }, [moviesPool]);

  const generateRound = () => {

    const selected = pickRandomMovies(moviesPool, 4);

    const sorted = [...selected].sort(
      (a, b) =>
        Number(a.release_date.slice(0, 4)) - Number(b.release_date.slice(0, 4)),
    );

    const shuffled = shuffleArray(selected);

    setCorrectOrder(sorted);
    setOptions(shuffled);
    setRoundResult(null);
  };

  const confirmRound = async () => {
    const sorted = [...correctOrder];
    const result = options.map((movie, index) => {
      const correctPos = sorted.findIndex((m) => m.id === movie.id) + 1;
      const isCorrect = correctPos === index + 1;
      return {
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        year: movie.release_date?.slice(0, 4),
        rating: movie.vote_average,
        userPosition: index + 1,
        correctPosition: correctPos,
        isCorrect,
      };
    });

    const correctCount = result.filter((r) => r.isCorrect).length;

    let roundPoints = 0;
    let comboBonus = 0;

    // Scoring system (in a 4-item ordering, minimum errors is 2):
    // Perfect (4/4): 150 points
    // 2 errors (2/4): 100 points (minimum possible errors)
    // 3+ errors (0-1/4): 50 points
    if (correctCount === 4) {
      roundPoints = 150;
    } else if (correctCount === 2) {
      roundPoints = 100;
    } else if (correctCount === 1) {
      roundPoints = 50;
    } else {
      roundPoints = 0;
    }

    // Perfect streak bonus: +50 points
    if (correctCount === 4) {
      const newCombo = currentCombo + 1;
      setCurrentCombo(newCombo);
      if (newCombo > maxCombo) {
        setMaxCombo(newCombo);
      }
      // Streak bonus only applies after the first perfect (combo > 1)
      if (newCombo > 1) {
        comboBonus = 50;
        roundPoints += comboBonus;
      }
    } else {
      setCurrentCombo(0); // Break combo
    }

    const isLastRound = currentRound === rounds;

    const roundObj = {
      movies: result,
      correctCount,
      roundPoints,
      comboBonus,
      roundNumber: currentRound,
      isPerfect: correctCount === 4,
    };

    setRoundResult(roundObj);
    setResultsHistory((prev) => [...prev, roundObj]);
    setTotalPoints((prev) => prev + roundPoints);

    if (gameId) {
      await addTimelineRound({
        gameId,
        roundNumber: currentRound,
        result: JSON.stringify({
          correctCount,
          roundPoints,
          comboBonus,
          isPerfect: correctCount === 4,
        }),
      });
    }

    if (isLastRound) {
      setGameFinished(true);
    }

    return roundObj;
  };

  const nextRound = async () => {
    if (currentRound < rounds) {
      setCurrentRound((r) => r + 1);
      generateRound();
      setRoundResult(null);
    } else {
      // 🏁 FIN DEL JUEGO
      setGameFinished(true);

      if (gameId) {
        await finishTimelineGame({
          gameId,
          userId: user.id,
          score: totalPoints,
        });
      }
    }
  };

  const resetGame = () => {
    setCurrentRound(1);
    setOptions([]);
    setCorrectOrder([]);
    setRoundResult(null);
    setResultsHistory([]);
    setTotalPoints(0);
    setMoviesPool([]);
    setIsLoading(true);
    setCurrentCombo(0);
    setMaxCombo(0);
    setGameFinished(false);
    setGameId(null);
  };

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

    gameFinished,
  };
  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
}

export const useTimelineContext = () => useContext(TimelineContext);

// Utils
const pickRandomMovies = (list, amount) => {
  const used = new Set();
  const result = [];

  while (result.length < amount) {
    const i = Math.floor(Math.random() * list.length);
    if (!used.has(i)) {
      used.add(i);
      result.push(list[i]);
    }
  }
  return result;
};

const shuffleArray = (arr) => {
  return [...arr].sort(() => Math.random() - 0.5);
};
