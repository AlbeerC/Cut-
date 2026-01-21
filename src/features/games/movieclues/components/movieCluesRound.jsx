import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Search, Eye, EyeOff, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useMovieCluesContext } from "../context/MovieCluesContext"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"

export default function MovieCluesRound() {
  const navigate = useNavigate()
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const {
    currentRound,
    rounds,
    currentMovie,
    revealedClues,
    maxClues,
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedMovie,
    showResult,
    score,
    totalPoints,
    roundPoints,
    searchMovies,
    selectMovieFromSearch,
    confirmAnswer,
    revealNextClue,
    nextRound,
    roundData,
    gameFinished,
    isLastRound
  } = useMovieCluesContext()

  useEffect(() => {
    if (!roundData || roundData.length === 0) {
      navigate("/games/movieclues")
    }
  }, [roundData, navigate])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length >= 2) {
        searchMovies(searchQuery)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  if (!currentMovie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    )
  }

  const handleNext = () => {
    if (isLastRound) {
      navigate("/games/movieclues/finish")
    } else {
      nextRound()
      navigate("/games/movieclues/play")
    }
  }

  const handleConfirm = () => {
    if (!selectedMovie) return
    confirmAnswer()
  }

  const isCorrect = showResult && selectedMovie && selectedMovie.id === currentMovie.id

  // Blur level based on revealed clues
  const getBlurLevel = () => {
    if (showResult) return "blur-0"
    if (revealedClues === 1) return "blur-[20px]"
    if (revealedClues === 2) return "blur-[10px]"
    if (revealedClues === 3) return "blur-[5px]"
    return "blur-0"
  }

return (
    <div className="h-screen bg-background overflow-hidden flex flex-col safe-top safe-bottom pt-20">
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col p-3 lg:p-4">
        {/* Header - Compacto en mobile */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-2 lg:mb-3 shrink-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-muted-foreground">
              Ronda {currentRound}/{rounds}
            </span>
            <div className="flex items-center gap-1.5 lg:gap-2">
              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                {score} ✓
              </Badge>
              <Badge className="text-xs px-2 py-0.5 bg-primary">{totalPoints} pts</Badge>
            </div>
          </div>
          <Progress value={(currentRound / rounds) * 100} className="h-1.5" />
        </motion.div>

        {/* Layout adaptativo: vertical en mobile, horizontal en desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 lg:gap-3 flex-1 min-h-0">
          {/* Poster - Más compacto en mobile */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="flex flex-col min-h-0 w-full lg:max-w-sm lg:mx-auto"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-2 lg:p-3 flex flex-col flex-1 min-h-0">
              {/* Header más compacto en mobile */}
              <div className="flex items-center justify-between mb-1.5 lg:mb-2 shrink-0">
                <h3 className="text-xs lg:text-sm font-semibold flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary" />
                  <span className="hidden sm:inline">Pistas</span>
                  <Badge variant="outline" className="text-xs ml-1 lg:ml-0">
                    {revealedClues}/{maxClues}
                  </Badge>
                </h3>
              </div>

              {/* Poster - altura fija en mobile para evitar scroll */}
              <div className="relative w-full rounded-lg overflow-hidden bg-muted mb-1.5 lg:mb-2 flex items-center justify-center h-40 sm:h-48 lg:flex-1 lg:min-h-0">
                <img
                  src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
                  alt="Película misteriosa"
                  className={`max-w-full max-h-full w-auto h-auto object-contain transition-all duration-700 ${getBlurLevel()}`}
                />
              </div>

              {/* Indicadores de pistas - horizontal en mobile */}
              <div className="flex lg:flex-col gap-1.5 lg:gap-1 shrink-0 text-[10px] sm:text-xs">
                <div className="flex items-center gap-1 lg:gap-2 flex-1 lg:flex-none">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${revealedClues >= 1 ? "bg-primary" : "bg-muted"}`} />
                  <span className={`truncate ${revealedClues >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
                    Muy borroso
                  </span>
                </div>
                <div className="flex items-center gap-1 lg:gap-2 flex-1 lg:flex-none">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${revealedClues >= 2 ? "bg-primary" : "bg-muted"}`} />
                  <span className={`truncate ${revealedClues >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
                    Menos borroso
                  </span>
                </div>
                <div className="flex items-center gap-1 lg:gap-2 flex-1 lg:flex-none">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${revealedClues >= 3 ? "bg-primary" : "bg-muted"}`} />
                  <span className={`truncate ${revealedClues >= 3 ? "text-foreground" : "text-muted-foreground"}`}>
                    Casi claro
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Search and Controls - Más compacto en mobile */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            className="flex flex-col gap-2 min-h-0"
          >
            {/* Search Input */}
            <Card className="bg-card/50 border-primary/20 p-2 lg:p-3 shrink-0">
              <h3 className="text-xs lg:text-sm font-semibold mb-1.5 lg:mb-2 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-primary" />
                Buscar Película
              </h3>

              <div className="relative">
                <Input
                  type="text"
                  placeholder="Nombre de la película..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  disabled={showResult}
                  className="pr-10 text-sm h-9"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />

                {/* Search Results Dropdown - Posición fija en mobile */}
                <AnimatePresence>
                  {isSearchFocused && searchResults.length > 0 && !selectedMovie && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="fixed lg:absolute z-50 left-3 right-3 lg:left-0 lg:right-0 lg:w-full mt-1 bg-card border border-border rounded-lg shadow-xl max-h-[40vh] lg:max-h-48 overflow-y-auto"
                    >
                      {searchResults.map((movie) => (
                        <button
                          key={movie.id}
                          onClick={() => selectMovieFromSearch(movie)}
                          className="w-full p-2 flex items-center gap-2 hover:bg-muted active:bg-muted transition-colors text-left"
                        >
                          <div className="w-8 h-12 rounded overflow-hidden bg-muted shrink-0">
                            {movie.poster_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-full object-cover blur-[2px]"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Film className="w-4 h-4 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{movie.title}</p>
                            <p className="text-xs text-muted-foreground">{movie.release_date?.slice(0, 4) || "N/A"}</p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Selected Movie */}
              {selectedMovie && !showResult && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-2">
                  <Card className="p-2 border-primary/50 bg-primary/5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-12 rounded overflow-hidden bg-muted shrink-0">
                        {selectedMovie.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${selectedMovie.poster_path}`}
                            alt={selectedMovie.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film className="w-3 h-3 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs">{selectedMovie.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedMovie.release_date?.slice(0, 4) || "N/A"}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </Card>

            {/* Result Message - Más compacto en mobile */}
            <AnimatePresence>
              {showResult && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="shrink-0">
                  <Card
                    className={`p-2.5 lg:p-3 text-center gap-2 ${
                      isCorrect ? "bg-green-500/10 border-green-500/50" : "bg-red-500/10 border-red-500/50"
                    }`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full mx-auto mb-1.5 lg:mb-2 flex items-center justify-center ${
                        isCorrect ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {isCorrect ? (
                        <Check className="w-5 h-5 lg:w-6 lg:h-6 text-white" strokeWidth={3} />
                      ) : (
                        <X className="w-5 h-5 lg:w-6 lg:h-6 text-white" strokeWidth={3} />
                      )}
                    </motion.div>
                    <h3 className="text-sm lg:text-base font-bold mb-1">{isCorrect ? "¡Correcto!" : "Incorrecto"}</h3>
                    {isCorrect ? (
                      <>
                        <p className="text-xs text-muted-foreground mb-1.5">
                          ¡Excelente! Adivinaste "{currentMovie.title}"
                        </p>
                        <Badge className="text-xs lg:text-sm px-3 py-0.5 bg-primary">+{roundPoints} puntos</Badge>
                      </>
                    ) : (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">La película era:</p>
                        <p className="font-bold text-sm">{currentMovie.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">({currentMovie.release_date?.slice(0, 4)})</p>
                      </div>
                    )}
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons - Más compactos en mobile */}
            <div className="space-y-1.5 shrink-0 mt-auto">
              {!showResult ? (
                <>
                  <Button
                    size="default"
                    disabled={!selectedMovie}
                    onClick={handleConfirm}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold disabled:opacity-50 text-sm h-10 lg:h-11"
                  >
                    Confirmar Respuesta
                  </Button>

                  {revealedClues < maxClues && (
                    <Button
                      size="default"
                      variant="outline"
                      onClick={revealNextClue}
                      className="w-full border-primary/50 text-xs lg:text-sm h-9 lg:h-10"
                    >
                      <EyeOff className="w-3.5 h-3.5 mr-1.5 lg:mr-2" />
                      Revelar Pista (-pts)
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  size="default"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold text-sm h-10 lg:h-11"
                >
                  {isLastRound ? "Ver Resultados" : "Siguiente Ronda"}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
