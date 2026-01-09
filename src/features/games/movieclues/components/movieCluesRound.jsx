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
    if (currentRound >= rounds) {
      navigate("/games/movieclues/finish")
    } else {
      nextRound()
    }
  }

  const handleConfirm = () => {
    if (!selectedMovie) return
    confirmAnswer()
  }

  const isCorrect = showResult && selectedMovie && selectedMovie.id === currentMovie.id

  // Blur level based on revealed clues
  const getBlurLevel = () => {
    if (revealedClues === 1) return "blur-[20px]"
    if (revealedClues === 2) return "blur-[10px]"
    if (revealedClues === 3) return "blur-[5px]"
    return "blur-0"
  }

  return (
    <div className="min-h-screen bg-background p-4 pt-8 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Ronda {currentRound} de {rounds}
            </span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs px-2 py-1">
                {score} correctas
              </Badge>
              <Badge className="text-xs px-2 py-1 bg-primary">{totalPoints} pts</Badge>
            </div>
          </div>
          <Progress value={(currentRound / rounds) * 100} className="h-2" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Left: Movie Poster with Clues */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Pistas Reveladas
                </h3>
                <Badge variant="outline" className="text-sm">
                  {revealedClues}/{maxClues}
                </Badge>
              </div>

              {/* Poster */}
              <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden bg-muted mb-3">
                <img
                  src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`}
                  alt="Película misteriosa"
                  className={`w-full h-full object-cover transition-all duration-700 ${getBlurLevel()}`}
                />
              </div>

              {/* Clue Indicators */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${revealedClues >= 1 ? "bg-primary" : "bg-muted"}`} />
                  <span className={revealedClues >= 1 ? "text-foreground" : "text-muted-foreground"}>
                    Poster muy borroso
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${revealedClues >= 2 ? "bg-primary" : "bg-muted"}`} />
                  <span className={revealedClues >= 2 ? "text-foreground" : "text-muted-foreground"}>
                    Poster menos borroso
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${revealedClues >= 3 ? "bg-primary" : "bg-muted"}`} />
                  <span className={revealedClues >= 3 ? "text-foreground" : "text-muted-foreground"}>
                    Poster casi claro
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${revealedClues >= 4 ? "bg-primary" : "bg-muted"}`} />
                  <span className={revealedClues >= 4 ? "text-foreground" : "text-muted-foreground"}>
                    Año: {currentMovie.release_date?.slice(0, 4) || "???"}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Right: Search and Results */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-4">
            {/* Search Input */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Search className="w-5 h-5 text-primary" />
                Buscar Película
              </h3>

              <div className="relative">
                <Input
                  type="text"
                  placeholder="Escribe el nombre de la película..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  disabled={showResult}
                  className="pr-10"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {isSearchFocused && searchResults.length > 0 && !selectedMovie && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-xl max-h-64 overflow-y-auto"
                    >
                      {searchResults.map((movie) => (
                        <button
                          key={movie.id}
                          onClick={() => selectMovieFromSearch(movie)}
                          className="w-full p-2 flex items-center gap-2 hover:bg-muted transition-colors text-left"
                        >
                          <div className="w-8 h-12 rounded overflow-hidden bg-muted flex-shrink-0">
                            {movie.poster_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Film className="w-4 h-4 text-muted-foreground m-auto" />
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
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-3">
                  <Card className="p-3 border-primary/50 bg-primary/5">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-14 rounded overflow-hidden bg-muted flex-shrink-0">
                        {selectedMovie.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${selectedMovie.poster_path}`}
                            alt={selectedMovie.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Film className="w-4 h-4 text-muted-foreground m-auto" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{selectedMovie.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedMovie.release_date?.slice(0, 4) || "N/A"}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </Card>

            {/* Result Message */}
            <AnimatePresence>
              {showResult && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Card
                    className={`p-4 text-center ${
                      isCorrect ? "bg-green-500/10 border-green-500/50" : "bg-red-500/10 border-red-500/50"
                    }`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                        isCorrect ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {isCorrect ? (
                        <Check className="w-8 h-8 text-white" strokeWidth={3} />
                      ) : (
                        <X className="w-8 h-8 text-white" strokeWidth={3} />
                      )}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-1">{isCorrect ? "¡Correcto!" : "Incorrecto"}</h3>
                    {isCorrect ? (
                      <>
                        <p className="text-sm text-muted-foreground mb-2">
                          ¡Excelente! Adivinaste "{currentMovie.title}"
                        </p>
                        <Badge className="text-lg px-4 py-1 bg-primary">+{roundPoints} puntos</Badge>
                      </>
                    ) : (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">La película era:</p>
                        <p className="font-bold text-lg">{currentMovie.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">({currentMovie.release_date?.slice(0, 4)})</p>
                      </div>
                    )}
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="space-y-2">
              {!showResult ? (
                <>
                  <Button
                    size="lg"
                    disabled={!selectedMovie}
                    onClick={handleConfirm}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold disabled:opacity-50"
                  >
                    Confirmar Respuesta
                  </Button>

                  {revealedClues < maxClues && (
                    <Button
                      size="lg"
                      variant="outline"
                      onClick={revealNextClue}
                      className="w-full border-primary/50 hover:bg-primary/10 bg-transparent"
                    >
                      <EyeOff className="w-4 h-4 mr-2" />
                      Revelar Siguiente Pista (-pts)
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  size="lg"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity font-semibold"
                >
                  {currentRound >= rounds ? "Ver Resultados" : "Siguiente Ronda"}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
