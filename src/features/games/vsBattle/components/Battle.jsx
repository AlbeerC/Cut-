import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import MovieBattleCard from "./MovieBattleCard"
import { useFetch } from "@/features/movies/hooks/useFetch"
import { useVersusBattle } from "../hooks/useVersusBattle"
import VersusWinner from "./Winner"
import { useConfigContext } from "../context/ConfigContext"
import { getMoviesForVersus } from "../api/versus"
import { motion, AnimatePresence } from "framer-motion"
import { Film, Sparkles } from "lucide-react"
import { useEffect } from "react"

export default function VersusBattle() {
  const { size, category, decade, genre } = useConfigContext()

  const { data: moviesPool, loading, error } = useFetch(() => getMoviesForVersus(category.value, size, genre, decade))
  
  const { currentPair, winner, finalWinner, handleChoice, availableMovies } = useVersusBattle(moviesPool)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Estado de carga mejorado
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          {/* Icono animado */}
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center"
          >
            <Film className="w-10 h-10 text-primary" />
          </motion.div>

          {/* Texto */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Preparando la batalla
            </h3>
            <p className="text-muted-foreground">Cargando películas épicas...</p>
          </div>

          {/* Barra de progreso animada */}
          <div className="w-64 h-2 bg-muted/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ width: "50%" }}
            />
          </div>

          {/* Detalles de carga */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
          >
            <Sparkles className="w-4 h-4" />
            <span>Seleccionando los mejores contendientes</span>
          </motion.div>
        </motion.div>
      </div>
    )
  }
  
  // Error o sin datos
  if (error || !moviesPool || moviesPool.length < 2) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center"
      >
        <Card className="p-8 text-center space-y-4 border-destructive/50">
          <div className="w-16 h-16 mx-auto bg-destructive/20 rounded-full flex items-center justify-center">
            <Film className="w-8 h-8 text-destructive" />
          </div>
          <h3 className="text-xl font-bold text-destructive">Error al cargar películas</h3>
          <p className="text-muted-foreground">No se pudieron cargar las películas. Por favor, intenta nuevamente.</p>
        </Card>
      </motion.div>
    )
  }

  // Ganador final
  if (finalWinner) return <VersusWinner winner={finalWinner} />

  // Esperando inicialización del battle
  if (currentPair.length < 2) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-xl text-muted-foreground"
        >
          Preparando batalla...
        </motion.p>
      </div>
    )
  }

  const remainingMovies = currentPair.length + availableMovies?.length || 0

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-30">

      {/* VS Title */}
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-5xl font-bold text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2"
      >
        ¿Cuál gana?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 text-lg font-bold text-center"
      >
        {availableMovies.length} películas restantes
      </motion.p>

      {/* Battle Cards */}
      <div className="w-full max-w-xl grid grid-cols-[1fr_auto_1fr] md:grid-cols-2 gap-3 md:gap-24 items-center relative">
        {/* Movie Card 1 */}
        <div className="relative w-full min-h-[400px] md:min-h-[500px]">
          <AnimatePresence mode="wait">
            <button 
              key={currentPair[0]?.id}
              className="group absolute inset-0 w-full" 
              onClick={() => handleChoice(currentPair[0])}
              disabled={winner !== null}
            >
              <MovieBattleCard 
                movie={currentPair[0]} 
                isWinner={winner?.id === currentPair[0].id}
                isLoser={winner && winner.id !== currentPair[0].id}
              />

              {/* Click indicator - Solo desktop */}
              <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                  className="bg-primary/20 backdrop-blur-sm border-2 border-primary rounded-full px-8 py-4"
                >
                  <span className="text-primary font-bold text-xl">Click para elegir</span>
                </motion.div>
              </div>
            </button>
          </AnimatePresence>
        </div>

        {/* VS Divider - Desktop */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center"
        >
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(var(--primary), 0.3)",
                "0 0 40px rgba(var(--primary), 0.6)",
                "0 0 20px rgba(var(--primary), 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="bg-background border-2 border-primary rounded-full w-20 h-20 flex items-center justify-center z-10"
          >
            <span className="text-3xl font-bold text-primary">VS</span>
          </motion.div>
        </motion.div>

        {/* Mobile VS Divider - Compacto */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="flex md:hidden items-center justify-center"
        >
          <div className="bg-background border-2 border-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-lg font-bold text-primary">VS</span>
          </div>
        </motion.div>

        {/* Movie Card 2 */}
        <div className="relative w-full min-h-[400px] md:min-h-[500px]">
          <AnimatePresence mode="wait">
            <button 
              key={currentPair[1]?.id}
              className="group absolute inset-0 w-full" 
              onClick={() => handleChoice(currentPair[1])}
              disabled={winner !== null}
            >
              <MovieBattleCard 
                movie={currentPair[1]}
                isWinner={winner?.id === currentPair[1].id}
                isLoser={winner && winner.id !== currentPair[1].id}
              />

              {/* Click indicator - Solo desktop */}
              <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                  className="bg-primary/20 backdrop-blur-sm border-2 border-primary rounded-full px-8 py-4"
                >
                  <span className="text-primary font-bold text-xl">Click para elegir</span>
                </motion.div>
              </div>
            </button>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}