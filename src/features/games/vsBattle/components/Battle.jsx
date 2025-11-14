import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MovieBattleCard from "./MovieBattleCard"
import { useFetch } from "@/features/movies/hooks/useFetch"
import { useVersusBattle } from "../hooks/useVersusBattle"
import VersusWinner from "./Winner"
import { useConfigContext } from "../context/ConfigContext"
import { getMoviesForVersus } from "../api/versus"

export default function VersusBattle() {
  const { size, category, decade, genre } = useConfigContext()

  const { data: moviesPool, loading, error } = useFetch(() => getMoviesForVersus(category.value, size, genre, decade))
  
  const { currentPair, winner, finalWinner, handleChoice, availableMovies } = useVersusBattle(moviesPool)

  // Estado de carga
  if (loading) return <p className="min-h-[60vh]">...</p>
  
  // Error o sin datos
  if (error || !moviesPool || moviesPool.length < 2) {
    return <p>Error al cargar películas</p>
  }

  // Ganador final
  if (finalWinner) return <VersusWinner winner={finalWinner} />

  // Esperando inicialización del battle
  if (currentPair.length < 2) return <p>Preparando batalla...</p>

  const remainingMovies = currentPair.length + availableMovies?.length || 0

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-30 md:py-8">
      {/* Round Indicator */}
      <div className="mb-8 text-center md:mb-8">
        <Badge className="bg-primary/20 text-primary border-primary/30 px-6 py-2 text-lg md:text-base">
          {remainingMovies} películas restantes
        </Badge>
      </div>

      {/* VS Title */}
      <h2 className="text-2xl md:text-5xl font-bold text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
        ¿Cuál gana?
      </h2>
      <p className="mb-6 md:mb-8 text-lg font-bold text-center">
        {availableMovies.length} películas restantes
      </p>

      {/* Battle Cards */}
      <div className="w-full max-w-xl grid grid-cols-[1fr_auto_1fr] md:grid-cols-2 gap-3 md:gap-24 items-center relative">
        {/* Movie Card 1 */}
        <button 
          className="group relative w-full" 
          onClick={() => handleChoice(currentPair[0])}
          disabled={winner !== null}
        >
          <MovieBattleCard movie={currentPair[0]} />

          {/* Click indicator - Solo desktop */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-primary/20 backdrop-blur-sm border-2 border-primary rounded-full px-8 py-4">
              <span className="text-primary font-bold text-xl">Click para elegir</span>
            </div>
          </div>
        </button>

        {/* VS Divider - Desktop */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center">
          <div className="bg-background border-2 border-primary rounded-full w-20 h-20 flex items-center justify-center shadow-lg shadow-primary/30 z-10">
            <span className="text-3xl font-bold text-primary">VS</span>
          </div>
        </div>

        {/* Mobile VS Divider - Compacto */}
        <div className="flex md:hidden items-center justify-center">
          <div className="bg-background border-2 border-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-lg font-bold text-primary">VS</span>
          </div>
        </div>

        {/* Movie Card 2 */}
        <button 
          className="group relative w-full" 
          onClick={() => handleChoice(currentPair[1])}
          disabled={winner !== null}
        >
          <MovieBattleCard movie={currentPair[1]} />

          {/* Click indicator - Solo desktop */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-primary/20 backdrop-blur-sm border-2 border-primary rounded-full px-8 py-4">
              <span className="text-primary font-bold text-xl">Click para elegir</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}