import { createContext, useContext, useState } from "react";
import {
  addMovieCluesRound,
  finishMovieCluesGame,
} from "../db/points.db";
import { useAuth } from "@/features/auth/context/AuthContext";

const MovieCluesContext = createContext();

export default function MovieCluesProvider({ children }) {
  const [rounds, setRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(1);
  const [moviePool, setMoviePool] = useState([]);
  const [roundData, setRoundData] = useState([]);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  // Current round state
  const [currentMovie, setCurrentMovie] = useState(null);
  const [revealedClues, setRevealedClues] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [roundPoints, setRoundPoints] = useState(0);

  const maxClues = 4; // Poster borroso → menos borroso → claro → + año

  // States for db logic
  const { user } = useAuth();
  const [gameId, setGameId] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);

  // Generate all rounds at once
  const generateRounds = (movies, numRounds) => {
    if (!movies || movies.length < numRounds) {
      console.error("[v0] No hay suficientes películas para generar rondas");
      return false;
    }

    const shuffled = [...movies].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, numRounds);

    setRoundData(selected);
    setCurrentMovie(selected[0]);
    setRevealedClues(1);
    return true;
  };

  // Search movies via TMDB API
  const searchMovies = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`,
      );
      const data = await response.json();
      setSearchResults(data.results.slice(0, 8)); // Limit to 8 results
    } catch (error) {
      console.error("[v0] Error searching movies:", error);
      setSearchResults([]);
    }
  };

  // Select movie from search results
  const selectMovieFromSearch = (movie) => {
    setSelectedMovie(movie);
    setSearchQuery(movie.title);
    setSearchResults([]);
  };

  // Confirm answer
  const confirmAnswer = () => {
    if (!selectedMovie || !currentMovie) return;

    const isCorrect = selectedMovie.id === currentMovie.id;
    const newAttempts = attempts + 1;

    const pointsMap = { 1: 150, 2: 100, 3: 75, 4: 25 };
    const earnedPoints = isCorrect ? pointsMap[revealedClues] || 0 : 0;

    const roundNumber = currentRound;

    const roundResult = {
      isCorrect,
      attempts: newAttempts,
      revealedClues,
      earnedPoints,
    };

    setAttempts(newAttempts);
    setRoundPoints(earnedPoints);
    setShowResult(true);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setTotalPoints((prev) => prev + earnedPoints);
    }

    if (gameId) {
      addMovieCluesRound({
        gameId,
        roundNumber,
        movieId: currentMovie.id,
        result: JSON.stringify(roundResult),
      });
    }
  };

  // Reveal next clue (wrong answer)
  const revealNextClue = () => {
    if (revealedClues < maxClues) {
      setRevealedClues((prev) => prev + 1);
      setShowResult(false);
      setSelectedMovie(null);
      setSearchQuery("");
      setAttempts((prev) => prev + 1);
    } else {
      // No more clues, force next round
      setShowResult(true);
    }
  };

  // Next round
  const nextRound = async () => {
    if (currentRound < roundData.length) {
      const nextRoundIndex = currentRound;
      setCurrentRound((prev) => prev + 1);
      setCurrentMovie(roundData[nextRoundIndex]);
      setRevealedClues(1);
      setSearchQuery("");
      setSearchResults([]);
      setSelectedMovie(null);
      setShowResult(false);
      setAttempts(0);
      setRoundPoints(0);
    } else {
      // 🏁 FIN DEL JUEGO
      setGameFinished(true);

      if (gameId) {
        await finishMovieCluesGame({
          gameId,
          userId: user.id,
          score: totalPoints,
        });
      }
    }
  };

  // Reset game
  const resetGame = () => {
    setCurrentRound(1);
    setScore(0);
    setTotalPoints(0);
    setMoviePool([]);
    setRoundData([]);
    setCurrentMovie(null);
    setRevealedClues(1);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedMovie(null);
    setShowResult(false);
    setAttempts(0);
    setRoundPoints(0);
    setGameId(null);
    setGameFinished(false)
  };

  const currentRoundData = roundData[currentRound - 1] || null;

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
    isLastRound: currentRound === rounds,

    // Methods
    generateRounds,
    searchMovies,
    selectMovieFromSearch,
    confirmAnswer,
    revealNextClue,
    nextRound,
    resetGame,

    // Poitns DB
    gameId,
    setGameId,
    gameFinished
  };

  return (
    <MovieCluesContext.Provider value={value}>
      {children}
    </MovieCluesContext.Provider>
  );
}

export const useMovieCluesContext = () => useContext(MovieCluesContext);
