import { useAuth } from "@/features/auth/context/AuthContext";
import { createContext, useContext, useState } from "react";
import { addMovieCluesRound, finishMovieCluesGame } from "../db/points.db";

const MovieCluesContext = createContext();

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieCluesProvider({ children }) {
  const [rounds, setRounds] = useState(5);
  const [currentRound, setCurrentRound] = useState(1);
  const [moviePool, setMoviePool] = useState([]);
  const [roundData, setRoundData] = useState([]);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  // Current round state
  const [currentMovie, setCurrentMovie] = useState(null);
  const [backdrops, setBackdrops] = useState([]); // Escenas de la pelicula
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 0, 1, 2
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [inputLocked, setInputLocked] = useState(false); // Bloquear input despues de intento fallido
  const [roundPoints, setRoundPoints] = useState(0);
  const [isLoadingBackdrops, setIsLoadingBackdrops] = useState(false);
  const [gameId, setGameId] = useState(null);
  const { user } = useAuth();

  const maxImages = 3; // Maximo 3 imagenes por ronda

  // Fetch backdrops for a movie
  const fetchBackdrops = async (movieId) => {
    setIsLoadingBackdrops(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`,
      );
      const data = await response.json();

      // Filtrar backdrops SIN idioma (iso_639_1: null) - estos no tienen texto/titulos
      const availableBackdrops = data.backdrops || [];
      const cleanBackdrops = availableBackdrops.filter(
        (backdrop) => backdrop.iso_639_1 === null,
      );

      // Si no hay backdrops limpios, usar los que hay pero preferir los sin idioma
      const backdropsToUse =
        cleanBackdrops.length >= 3
          ? cleanBackdrops
          : [
              ...cleanBackdrops,
              ...availableBackdrops.filter((b) => b.iso_639_1 !== null),
            ];

      const shuffled = [...backdropsToUse].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, Math.min(3, shuffled.length));

      setBackdrops(selected);
      setIsLoadingBackdrops(false);
      return selected;
    } catch (error) {
      console.error("[v0] Error fetching backdrops:", error);
      setBackdrops([]);
      setIsLoadingBackdrops(false);
      return [];
    }
  };

  // Generate all rounds at once
  const generateRounds = async (movies, numRounds) => {
    if (!movies || movies.length < numRounds) {
      console.error("[v0] No hay suficientes películas para generar rondas");
      return false;
    }

    const shuffled = [...movies].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, numRounds);

    setRoundData(selected);
    setCurrentMovie(selected[0]);
    setCurrentImageIndex(0);

    // Cargar backdrops de la primera pelicula
    await fetchBackdrops(selected[0].id);

    return true;
  };

  // Search movies via TMDB API
  const searchMovies = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`,
      );
      const data = await response.json();
      // Ordenar por popularidad
      const sorted = data.results.sort((a, b) => b.popularity - a.popularity);
      setSearchResults(sorted.slice(0, 8));
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

  // Points based on image number: 150 / 100 / 75
  const getPointsForImage = (imageIndex) => {
    const pointsMap = { 0: 150, 1: 100, 2: 75 };
    return pointsMap[imageIndex] || 0;
  };

  // Confirm answer - 1 intento por imagen
  const confirmAnswer = () => {
    if (!selectedMovie || !currentMovie || inputLocked) return;

    const correct = selectedMovie.id === currentMovie.id;
    setIsCorrect(correct);

    if (correct) {
      const earnedPoints = getPointsForImage(currentImageIndex);
      setRoundPoints(earnedPoints);
      setScore((prev) => prev + 1);
      setTotalPoints((prev) => prev + earnedPoints);
      setShowResult(true);

      if (gameId) {
        addMovieCluesRound({
          gameId,
          roundNumber: currentRound,
          movieId: currentMovie.id,
          result: JSON.stringify({
            isCorrect: true,
            clues: currentImageIndex,
            earnedPoints: earnedPoints,
          }),
        });
      }
    } else {
      // Respuesta incorrecta
      setInputLocked(true); // Bloquear input

      if (
        currentImageIndex < maxImages - 1 &&
        currentImageIndex < backdrops.length - 1
      ) {
        // Hay mas imagenes disponibles - mostrar feedback y desbloquear siguiente imagen
        setShowResult(true);
        setRoundPoints(0);
      } else {
        // No hay mas imagenes - fin de la ronda sin puntos
        setShowResult(true);
        setRoundPoints(0);

        if (gameId) {
          addMovieCluesRound({
            gameId,
            roundNumber: currentRound,
            movieId: currentMovie.id,
            result: JSON.stringify({
              isCorrect: false,
              clues: currentImageIndex,
              earnedPoints: roundPoints,
            }),
          });
        }
      }
    }
  };

  // Pasar a la siguiente imagen (despues de respuesta incorrecta)
  const nextImage = () => {
    if (
      currentImageIndex < maxImages - 1 &&
      currentImageIndex < backdrops.length - 1
    ) {
      setCurrentImageIndex((prev) => prev + 1);
      setShowResult(false);
      setInputLocked(false);
      setSelectedMovie(null);
      setSearchQuery("");
      setIsCorrect(false);
    }
  };

  // Next round
  const nextRound = async () => {
    if (currentRound < roundData.length) {
      const nextRoundIndex = currentRound;
      const nextMovie = roundData[nextRoundIndex];

      setCurrentRound((prev) => prev + 1);
      setCurrentMovie(nextMovie);
      setCurrentImageIndex(0);
      setSearchQuery("");
      setSearchResults([]);
      setSelectedMovie(null);
      setShowResult(false);
      setIsCorrect(false);
      setInputLocked(false);
      setRoundPoints(0);

      // Cargar backdrops de la siguiente pelicula
      await fetchBackdrops(nextMovie.id);
    } else {
      // Fin del juego
      if (gameId) {
        await finishMovieCluesGame({
          gameId,
          userId: user.id,
          score: totalPoints,
        });
      }
    }
  };

  const giveUp = () => {
    setIsCorrect(false);
    setRoundPoints(0);
    setInputLocked(true);
    setShowResult(true);
  };

  // Reset game
  const resetGame = () => {
    setCurrentRound(1);
    setScore(0);
    setTotalPoints(0);
    setMoviePool([]);
    setRoundData([]);
    setCurrentMovie(null);
    setBackdrops([]);
    setCurrentImageIndex(0);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedMovie(null);
    setShowResult(false);
    setIsCorrect(false);
    setInputLocked(false);
    setRoundPoints(0);
  };

  // Calcular puntos posibles para la imagen actual
  const possiblePoints = getPointsForImage(currentImageIndex);

  // Verificar si hay mas imagenes disponibles
  const hasMoreImages =
    currentImageIndex < maxImages - 1 &&
    currentImageIndex < backdrops.length - 1;

  // Imagen actual
  const currentBackdrop = backdrops[currentImageIndex] || null;

  const value = {
    rounds,
    setRounds,
    currentRound,
    moviePool,
    setMoviePool,
    roundData,
    score,
    totalPoints,

    // Current round state
    currentMovie,
    backdrops,
    currentBackdrop,
    currentImageIndex,
    maxImages,
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedMovie,
    showResult,
    isCorrect,
    inputLocked,
    roundPoints,
    possiblePoints,
    hasMoreImages,
    isLoadingBackdrops,
    gameId,
    setGameId,
    isLastRound: currentRound === rounds,

    // Methods
    generateRounds,
    searchMovies,
    selectMovieFromSearch,
    confirmAnswer,
    nextImage,
    nextRound,
    resetGame,
    giveUp,
  };

  return (
    <MovieCluesContext.Provider value={value}>
      {children}
    </MovieCluesContext.Provider>
  );
}

export const useMovieCluesContext = () => useContext(MovieCluesContext);
