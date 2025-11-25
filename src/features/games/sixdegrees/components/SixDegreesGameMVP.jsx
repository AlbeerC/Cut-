import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, CheckCircle2, Undo2, Film } from "lucide-react"
import { useSixDegrees } from "../context/SixDegreesContext"

export default function SixDegreesGameMVP() {
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
    selectRandomActors,
    handleSearch,
    handleSelectActor,
    handleUndo,
    handleReset,
  } = useSixDegrees()

  useEffect(() => {
    if (!actorA || !actorB) {
      selectRandomActors()
    }
  }, [])

  if (!actorA || !actorB) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando juego...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 pt-30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold">Six Degrees - MVP</h1>
            <Badge className="text-xs px-2 py-1 bg-primary">Pasos: {chain.length - 1}</Badge>
          </div>
        </motion.div>

        {/* Objetivo */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20 mb-4">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actorA.profile_path}`}
                    alt={actorA.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Desde</p>
                  <p className="font-semibold text-sm">{actorA.name}</p>
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-primary" />

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Hasta</p>
                  <p className="font-semibold text-sm">{actorB.name}</p>
                </div>
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-accent">
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
        <Card className="p-4 mb-4 bg-card/50 backdrop-blur-sm">
          <h3 className="text-sm font-semibold mb-3">Cadena de conexión:</h3>
          <div className="flex flex-wrap items-center gap-2">
            {chain.map((link, index) => (
              <div key={index} className="flex items-center gap-2">
                {/* Actor */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 bg-secondary/50 rounded-lg p-2"
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-primary/30">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${link.actor.profile_path}`}
                      alt={link.actor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium">{link.actor.name}</p>
                  </div>
                </motion.div>

                {/* Película conectora */}
                {link.movie && (
                  <>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-primary/10 rounded px-2 py-1"
                    >
                      <div className="flex items-center gap-1">
                        <Film className="w-3 h-3 text-primary" />
                        <p className="text-xs text-muted-foreground">
                          {link.movie.title} ({link.movie.year})
                        </p>
                      </div>
                    </motion.div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
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
              <Card className="p-4 mb-4 bg-accent/20 border-accent">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-accent" />
                  <div>
                    <h3 className="font-bold">¡Conectado!</h3>
                    <p className="text-sm text-muted-foreground">Completaste la conexión en {chain.length - 1} pasos</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Búsqueda de actores */}
        {!gameWon && (
          <Card className="p-4 mb-4 bg-card/50 backdrop-blur-sm">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Search className="w-4 h-4 text-primary" />
              Buscar siguiente actor
            </h3>

            <Input
              placeholder="Escribe el nombre de un actor..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              disabled={isValidating}
              className="mb-3"
            />

            {/* Mensaje de error */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-3 p-2 bg-destructive/20 text-destructive text-sm rounded"
              >
                {errorMessage}
              </motion.div>
            )}

            {/* Resultados de búsqueda */}
            {isSearching && <p className="text-sm text-muted-foreground">Buscando...</p>}

            {searchResults.length > 0 && (
              <div className="space-y-2">
                {searchResults.map((actor) => (
                  <motion.div
                    key={actor.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleSelectActor(actor)}
                    className="flex items-center gap-3 p-2 bg-secondary/50 hover:bg-secondary rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
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
                    <div>
                      <p className="text-sm font-medium">{actor.name}</p>
                      {actor.known_for_department && (
                        <p className="text-xs text-muted-foreground">{actor.known_for_department}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Acciones */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleUndo}
            disabled={chain.length <= 1 || isValidating}
            className="flex-1 bg-transparent"
          >
            <Undo2 className="w-4 h-4 mr-2" />
            Deshacer
          </Button>
          <Button onClick={handleReset} disabled={isValidating} className="flex-1">
            Reiniciar
          </Button>
        </div>
      </div>
    </div>
  )
}
