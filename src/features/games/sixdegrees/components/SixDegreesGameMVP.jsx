import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, Undo2, Film, Lightbulb, Award, Timer } from "lucide-react"
import { useSixDegrees } from "../context/SixDegreesContext"
import { useNavigate } from "react-router"

export default function SixDegreesGameMVP() {
  const navigate = useNavigate()
  const {
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
    score,
    handleSearch,
    handleSelectActor,
    handleUndo,
    useHint,
  } = useSixDegrees()

  useEffect(() => {
    if (config.timeLimit && timeRemaining === 0) {
      navigate("/games/sixdegrees/result")
    }
  }, [timeRemaining, config.timeLimit, navigate])

  useEffect(() => {
    if (gameWon) {
      setTimeout(() => {
        navigate("/games/sixdegrees/result")
      }, 1000)
    }
  }, [gameWon, navigate])

  if (!actorA || !actorB) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando juego...</p>
      </div>
    )
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }


  return (
    <div className="min-h-screen bg-background p-3 pt-30 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-3">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <h1 className="text-lg font-bold">Six Degrees</h1>
            <div className="flex items-center gap-1.5">
              {config.timeLimit && timeRemaining !== null && (
                <Badge
                  className={`text-xs px-2 py-0.5 ${timeRemaining < 30 ? "bg-red-500 animate-pulse" : "bg-primary"}`}
                >
                  <Timer className="w-3 h-3 mr-1" />
                  {formatTime(timeRemaining)}
                </Badge>
              )}
              <Badge className="text-xs px-2 py-0.5 bg-primary">Pasos: {chain.length - 1}</Badge>
              <Badge className="text-xs px-2 py-0.5 bg-accent">
                <Lightbulb className="w-3 h-3 mr-1" />
                {3 - hintsUsed}
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Objetivo */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="p-3 bg-card/50 backdrop-blur-sm border-primary/20 mb-3">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary flex-shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actorA.profile_path}`}
                    alt={actorA.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Desde</p>
                  <p className="font-semibold text-xs">{actorA.name}</p>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />

              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Hasta</p>
                  <p className="font-semibold text-xs">{actorB.name}</p>
                </div>
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-accent flex-shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actorB.profile_path}`}
                    alt={actorB.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Cadena de actores */}
        <Card className="p-3 mb-3 bg-card/50 backdrop-blur-sm">
          <h3 className="text-xs font-semibold mb-2">Cadena:</h3>
          <div className="flex overflow-x-auto gap-1.5 pb-2 scrollbar-thin scrollbar-thumb-primary/20">
            {chain.map((link, index) => (
              <div key={index} className="flex items-center gap-1.5 flex-shrink-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1.5 bg-secondary/50 rounded-lg p-1.5"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1 ring-primary/30">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${link.actor.profile_path}`}
                      alt={link.actor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-medium whitespace-nowrap max-w-[80px] truncate">{link.actor.name}</p>
                </motion.div>

                {link.movie && index < chain.length - 1 && (
                  <>
                    <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-primary/10 rounded px-1.5 py-1"
                    >
                      <div className="flex items-center gap-1">
                        <Film className="w-3 h-3 text-primary flex-shrink-0" />
                        <p className="text-xs text-muted-foreground whitespace-nowrap max-w-[100px] truncate">
                          {link.movie.title}
                        </p>
                      </div>
                    </motion.div>
                    <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Mensaje de victoria */}
        <AnimatePresence>
          {gameWon && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="p-3 mb-3 bg-accent/20 border-accent">
                <div className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm">¡Conectado!</h3>
                    <p className="text-xs text-muted-foreground">
                      {chain.length - 1} pasos • {score} puntos
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Búsqueda de actores */}
        {!gameWon && (
          <Card className="p-3 mb-3 bg-card/50 backdrop-blur-sm">
            <h3 className="text-xs font-semibold mb-2 flex items-center gap-2">
              <Search className="w-3 h-3 text-primary" />
              Buscar siguiente actor
            </h3>

            <Input
              placeholder="Escribe el nombre..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              disabled={isValidating}
              className="mb-2 text-sm h-9"
            />

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-2 p-2 rounded text-xs ${
                  errorMessage.startsWith("💡") ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"
                }`}
              >
                {errorMessage}
              </motion.div>
            )}

            {isSearching && <p className="text-xs text-muted-foreground">Buscando...</p>}

            {searchResults.length > 0 && (
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {searchResults.map((actor) => (
                  <motion.div
                    key={actor.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleSelectActor(actor)}
                    className="flex items-center gap-2 p-2 bg-secondary/50 hover:bg-secondary rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs">?</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{actor.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{actor.known_for_department || "Actor"}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Acciones */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
            disabled={chain.length <= 1 || isValidating || gameWon}
            className="flex-1 bg-transparent text-xs h-9"
          >
            <Undo2 className="w-3 h-3 mr-1" />
            Deshacer {undoCount > 0 && `(-${undoCount * 2})`}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={useHint}
            disabled={hintsUsed >= 3 || isValidating || gameWon}
            className="flex-1 bg-transparent text-xs h-9"
          >
            <Lightbulb className="w-3 h-3 mr-1" />
            Pista ({3 - hintsUsed})
          </Button>
        </div>
      </div>
    </div>
  )
}
