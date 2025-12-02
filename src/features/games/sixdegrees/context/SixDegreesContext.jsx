import { createContext, useContext, useState, useEffect, useRef } from "react";
import { actorsPool } from "../api/actorsPool";

const SixDegreesContext = createContext(null);

export const SixDegreesProvider = ({ children }) => {
  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Estados del juego
  const [actorA, setActorA] = useState(null);
  const [actorB, setActorB] = useState(null);
  const [chain, setChain] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Estados de configuración del juego
  const [config, setConfig] = useState({
    maxSteps: 6,
    timeLimit: null, // null = sin límite, número = segundos
    difficulty: "medium",
  });
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [undoCount, setUndoCount] = useState(0);
  const [optimalPath, setOptimalPath] = useState(null);
  const [score, setScore] = useState(0);

  const timerRef = useRef(null);

  useEffect(() => {
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // Start timer only if there's a time limit and game is active
    if (
      config.timeLimit &&
      timeRemaining !== null &&
      timeRemaining > 0 &&
      !gameWon
    ) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [config.timeLimit, timeRemaining, gameWon]);

  // Función para inicializar el juego con dos actores
  const initializeGame = (startActor, endActor, timeLimit = null) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setActorA(startActor);
    setActorB(endActor);
    setChain([{ actor: startActor, movie: null }]);
    setSearchQuery("");
    setSearchResults([]);
    setGameWon(false);
    setErrorMessage("");
    setHintsUsed(0);
    setUndoCount(0);
    setOptimalPath(null);
    setScore(0);
    setTimeRemaining(timeLimit); // Now properly initialized with the config value
  };

  // Función para seleccionar actores aleatoriamente de una pool
  const selectRandomActors = async () => {
    try {
      const shuffled = [...actorsPool].sort(() => Math.random() - 0.5);
      const actor1Id = shuffled[0].id;
      const actor2Id = shuffled[1].id;

      const [response1, response2] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/person/${actor1Id}?api_key=${TMDB_API_KEY}&language=es-ES`
        ),
        fetch(
          `https://api.themoviedb.org/3/person/${actor2Id}?api_key=${TMDB_API_KEY}&language=es-ES`
        ),
      ]);

      const [data1, data2] = await Promise.all([
        response1.json(),
        response2.json(),
      ]);

      const startActor = {
        id: data1.id,
        name: data1.name,
        profile_path: data1.profile_path,
      };

      const endActor = {
        id: data2.id,
        name: data2.name,
        profile_path: data2.profile_path,
      };

      initializeGame(startActor, endActor, config.timeLimit); // Pass timeLimit here
    } catch (error) {
      console.log("[v0] Error selecting random actors:", error);
    }
  };

  // Búsqueda de actores
  const handleSearch = async (query) => {
    setSearchQuery(query);
    setErrorMessage("");

    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/person?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          query
        )}&language=es-ES`
      );
      const data = await response.json();

      // Sort by popularity and limit to top 8 results
      const sortedResults = (data.results || [])
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 8);

      setSearchResults(sortedResults);
    } catch (error) {
      console.log("[v0] Error searching actors:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Encontrar película compartida entre dos actores
  const findSharedMovie = async (actor1Id, actor2Id) => {
    try {
      const [response1, response2] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/person/${actor1Id}/movie_credits?api_key=${TMDB_API_KEY}&language=es-ES`
        ),
        fetch(
          `https://api.themoviedb.org/3/person/${actor2Id}/movie_credits?api_key=${TMDB_API_KEY}&language=es-ES`
        ),
      ]);

      const [data1, data2] = await Promise.all([
        response1.json(),
        response2.json(),
      ]);
      const movies1 = data1.cast || [];
      const movies2 = data2.cast || [];

      const shared = movies1.find((m1) =>
        movies2.some((m2) => m2.id === m1.id)
      );

      return shared
        ? {
            id: shared.id,
            title: shared.title,
            year: shared.release_date?.split("-")[0] || "N/A",
          }
        : null;
    } catch (error) {
      console.log("[v0] Error finding shared movie:", error);
      return null;
    }
  };

  // Seleccionar un actor y validar conexión
  const handleSelectActor = async (selectedActor) => {
    setIsValidating(true);
    setErrorMessage("");
    setSearchQuery("");
    setSearchResults([]);

    const lastActor = chain[chain.length - 1].actor;

    if (chain.some((c) => c.actor.id === selectedActor.id)) {
      setErrorMessage("Este actor ya está en la cadena");
      setIsValidating(false);
      return;
    }

    const sharedMovie = await findSharedMovie(lastActor.id, selectedActor.id);

    if (!sharedMovie) {
      setErrorMessage(
        `${selectedActor.name} no tiene películas en común con ${lastActor.name}`
      );
      setIsValidating(false);
      return;
    }

    const newLink = {
      actor: selectedActor,
      movie: sharedMovie,
    };
    setChain([...chain, newLink]);

    if (selectedActor.id === actorB?.id) {
      setGameWon(true);
      const finalScore = calculateScore();
      setScore(finalScore);
    }

    setIsValidating(false);
  };

  // Deshacer último paso
  const handleUndo = () => {
    if (chain.length > 1) {
      setChain(chain.slice(0, -1));
      setGameWon(false);
      setErrorMessage("");
      setUndoCount(undoCount + 1);
    }
  };

  // Reiniciar juego
  const handleReset = () => {
    if (actorA && actorB) {
      initializeGame(actorA, actorB, config.timeLimit);
    }
  };

  // Sistema de pistas
  const useHint = async () => {
    if (hintsUsed >= 3) {
      setErrorMessage("Ya usaste todos los hints disponibles");
      return;
    }

    setHintsUsed(hintsUsed + 1);
    const lastActor = chain[chain.length - 1].actor;

    try {
      if (hintsUsed === 0) {
        // Hint 1: Get genres from a common movie between last actor and target
        const [lastActorCredits, targetCredits] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/person/${lastActor.id}/movie_credits?api_key=${TMDB_API_KEY}&language=es-ES`
          ),
          fetch(
            `https://api.themoviedb.org/3/person/${actorB.id}/movie_credits?api_key=${TMDB_API_KEY}&language=es-ES`
          ),
        ]);

        const [lastData, targetData] = await Promise.all([
          lastActorCredits.json(),
          targetCredits.json(),
        ]);

        const lastMovies = lastData.cast || [];
        const targetMovies = targetData.cast || [];

        // Find actors that worked with target actor
        const targetCoActors = new Set();
        for (const movie of targetMovies.slice(0, 10)) {
          const movieResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${TMDB_API_KEY}`
          );
          const movieData = await movieResponse.json();
          movieData.cast
            ?.slice(0, 5)
            .forEach((actor) => targetCoActors.add(actor.name));
        }

        if (targetCoActors.size > 0) {
          const randomCoActor =
            Array.from(targetCoActors)[
              Math.floor(Math.random() * targetCoActors.size)
            ];
          setErrorMessage(
            `💡 Pista 1: Busca actores que hayan trabajado con ${randomCoActor}`
          );
        } else {
          setErrorMessage(`💡 Pista 1: Busca actores populares de Hollywood`);
        }
      } else if (hintsUsed === 1) {
        // Hint 2: Suggest a decade based on target actor's popular movies
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${actorB.id}/movie_credits?api_key=${TMDB_API_KEY}&language=es-ES`
        );
        const data = await response.json();
        const movies = data.cast || [];

        if (movies.length > 0) {
          const sortedByPopularity = movies.sort(
            (a, b) => (b.popularity || 0) - (a.popularity || 0)
          );
          const popularMovie = sortedByPopularity[0];
          const year = popularMovie.release_date?.split("-")[0];
          const decade = year ? `${Math.floor(year / 10) * 10}s` : "2000s";

          setErrorMessage(
            `💡 Pista 2: Intenta con actores que trabajaron en los ${decade}`
          );
        } else {
          setErrorMessage("💡 Pista 2: Intenta con actores contemporáneos");
        }
      } else if (hintsUsed === 2) {
        // Hint 3: Reveal a specific movie title that connects to target
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${actorB.id}/movie_credits?api_key=${TMDB_API_KEY}&language=es-ES`
        );
        const data = await response.json();
        const movies = data.cast || [];

        if (movies.length > 0) {
          const sortedByPopularity = movies.sort(
            (a, b) => (b.popularity || 0) - (a.popularity || 0)
          );
          const popularMovie = sortedByPopularity[0];
          setErrorMessage(
            `💡 Pista 3: Busca actores que aparecieron en "${popularMovie.title}"`
          );
        } else {
          setErrorMessage(
            `💡 Pista 3: Busca actores muy conocidos que trabajaron con ${actorB.name}`
          );
        }
      }
    } catch (error) {
      console.log("[v0] Error generating hint:", error);
      setErrorMessage(`💡 Pista: Busca actores populares de Hollywood`);
    }
  };

  // Función para calcular la puntuación
  const calculateScore = () => {
    const BASE_SCORE = 100;
    const steps = chain.length - 1;
    const optimalSteps = 2; // Asumimos que el óptimo es 2-3 pasos

    let finalScore = BASE_SCORE;

    // Penalización por pasos extra
    const extraSteps = Math.max(0, steps - optimalSteps);
    finalScore -= extraSteps * 15;

    // Penalización por hints
    finalScore -= hintsUsed * 10;

    // Penalización por undos
    finalScore -= undoCount * 2;

    // Bonus por ruta óptima
    if (steps === optimalSteps) {
      finalScore += 50;
    }

    // Bonus si no usó hints
    if (hintsUsed === 0) {
      finalScore += 30;
    }

    // Bonus por tiempo (si hay límite)
    if (config.timeLimit && timeRemaining > 0) {
      const percentageLeft = (timeRemaining / config.timeLimit) * 100;
      if (percentageLeft > 50) {
        finalScore += 20;
      }
    }

    return Math.max(0, finalScore);
  };

  // Función para actualizar la configuración del juego
  const updateConfig = (newConfig) => {
    setConfig({ ...config, ...newConfig });
  };

  const value = {
    actorA,
    actorB,
    chain,
    searchQuery,
    searchResults,
    isSearching,
    isValidating,
    gameWon,
    errorMessage,
    config,
    timeRemaining,
    hintsUsed,
    undoCount,
    optimalPath,
    score,
    initializeGame,
    selectRandomActors,
    handleSearch,
    handleSelectActor,
    handleUndo,
    handleReset,
    useHint,
    updateConfig,
    setTimeRemaining,
  };

  return (
    <SixDegreesContext.Provider value={value}>
      {children}
    </SixDegreesContext.Provider>
  );
};

export const useSixDegrees = () => {
  const context = useContext(SixDegreesContext);
  if (!context) {
    throw new Error("useSixDegrees must be used within a SixDegreesProvider");
  }
  return context;
};
