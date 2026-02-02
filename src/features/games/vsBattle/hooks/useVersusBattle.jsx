import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { startVersusGame, finishVersusGame } from "../db/points.db";
import { useConfigContext } from "../context/ConfigContext";
import { safeStartGame } from "../../utils/gameAuth";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function useVersusBattle(moviesPool) {
  const [availableMovies, setAvailableMovies] = useState([]);
  const [currentPair, setCurrentPair] = useState([]);
  const [winner, setWinner] = useState(null);
  const [finalWinner, setFinalWinner] = useState(null);

  const { size } = useConfigContext();

  const sizeRef = useRef(null);

  useEffect(() => {
    if (size && sizeRef.current === null) {
      sizeRef.current = size;
    }
  }, [size]);

  const { user } = useAuth();
  const gameIdRef = useRef(null);

  const initializedRef = useRef(false);

  // Cuando llega el pool, lo barajamos e inicializamos el primer duelo
  useEffect(() => {
    if (!moviesPool || moviesPool.length < 2) return;
    if (initializedRef.current) return;

    initializedRef.current = true;

    const initGame = async () => {
      if (!gameIdRef.current) {
        const gameId = await safeStartGame({
          user,
          startGameFn: startVersusGame,
        });

        gameIdRef.current = gameId;
      }

      const shuffled = shuffleArray(moviesPool);
      setCurrentPair(shuffled.slice(0, 2));
      setAvailableMovies(shuffled.slice(2));
    };

    initGame();
  }, [moviesPool, user]);

  const handleChoice = (chosenMovie) => {
    setWinner(chosenMovie);

    setTimeout(() => {
      if (availableMovies.length === 0) {
        // Fin del juego
        setFinalWinner(chosenMovie);
        setCurrentPair([]);

        // 🔥 cerrar partida + puntos
        if (gameIdRef.current && user) {
          finishVersusGame({
            gameId: gameIdRef.current,
            userId: user.id,
            score: 50 + sizeRef.current * 10,
          });
        }

        return;
      }

      // Tomamos la próxima película del pool
      const nextOpponent = availableMovies[0];
      setCurrentPair([chosenMovie, nextOpponent]);
      setAvailableMovies((prev) => prev.slice(1));
      setWinner(null);
    }, 600);
  };

  return { currentPair, winner, finalWinner, handleChoice, availableMovies };
}
