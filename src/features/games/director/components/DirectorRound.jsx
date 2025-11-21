import { motion, AnimatePresence } from "framer-motion"
import { Check, X, ChevronRight, Film, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useDirectorContext } from "../context/DirectorContext"
import { useNavigate } from "react-router"
import { useEffect } from "react"

export default function DirectorRound() {
  const navigate = useNavigate()

  const {
    currentRound,
    currentRoundData,
    rounds,
    roundData,
    selectedOption,
    showResult,
    score,
    selectOption,
    confirmAnswer,
    nextRound,
  } = useDirectorContext()

  useEffect(() => {
    if (roundData.length === 0) {
      navigate("/games/director")
    }
  }, [roundData, currentRound, navigate])

  if (!currentRoundData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Cargando ronda...</p>
          <Button onClick={() => navigate("/games/director")} variant="outline">
            Volver a configuración
          </Button>
        </div>
      </div>
    )
  }

  const { movie, correctDirector, options } = currentRoundData

  const handleNext = () => {
    if (currentRound >= roundData.length) {
      navigate("/games/director/finish")
    } else {
      nextRound()
    }
  }

  const handleButtonClick = () => {
    if (showResult) {
      handleNext()
    } else {
      confirmAnswer()
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 pt-30">
      <div className="max-w-5xl mx-auto">
        {/* Progress Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Ronda {currentRound} de {rounds}
            </span>
            <span className="text-sm font-medium text-primary">Puntos: {score * 10}</span>
          </div>
          <Progress value={(currentRound / rounds) * 100} className="h-2" />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Movie Display - Left Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-1/3 flex-shrink-0"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 lg:p-5 lg:sticky lg:top-24">
              <h2 className="text-lg lg:text-xl font-bold mb-3 text-center flex items-center justify-center gap-2">
                <Film className="w-5 h-5 text-primary" />
                ¿Quién dirigió esta película?
              </h2>
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-32 h-48 lg:w-40 lg:h-60 rounded-lg overflow-hidden shadow-2xl shadow-primary/20 mb-2"
                >
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/placeholder.svg?height=400&width=300"
                    }
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <h3 className="text-lg lg:text-xl font-bold text-balance text-center">{movie.title}</h3>
                <p className="text-sm text-muted-foreground">({new Date(movie.release_date).getFullYear()})</p>
              </div>
            </Card>
          </motion.div>

          {/* Directors Grid - Right Side */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            <div className="flex flex-wrap gap-6">
              {options.map((director, index) => {
                const isSelected = selectedOption === director.name
                const isCorrectAnswer = director.name === correctDirector.name
                const shouldShowCorrect = showResult && isCorrectAnswer
                const shouldShowWrong = showResult && isSelected && !isCorrectAnswer

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      onClick={() => selectOption(director.name)}
                      className={`relative cursor-pointer transition-all p-0 pb-2 duration-300 overflow-hidden w-[130px] ${
                        isSelected && !showResult
                          ? "border-primary shadow-[0_0_30px_rgba(251,146,60,0.4)]"
                          : "border-border hover:border-primary/50"
                      } ${shouldShowCorrect ? "border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]" : ""} ${
                        shouldShowWrong ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]" : ""
                      } ${showResult && !isSelected && !isCorrectAnswer ? "opacity-50" : ""}`}
                    >

                        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-0 bg-muted">
                          {director.image ? (
                            <img
                              src={director.image || "/placeholder.svg"}
                              alt={director.name}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-12 h-12 lg:w-16 lg:h-16 text-muted-foreground/30" />
                          )}

                          {/* Result Badge */}
                          <AnimatePresence>
                            {shouldShowCorrect && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center"
                              >
                                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-green-500 flex items-center justify-center">
                                  <Check className="w-7 h-7 lg:w-8 lg:h-8 text-white" strokeWidth={3} />
                                </div>
                              </motion.div>
                            )}
                            {shouldShowWrong && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 bg-red-500/20 backdrop-blur-sm flex items-center justify-center"
                              >
                                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-red-500 flex items-center justify-center">
                                  <X className="w-7 h-7 lg:w-8 lg:h-8 text-white" strokeWidth={3} />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <h3 className="font-semibold text-center text-balance text-sm">{director.name}</h3>

                    </Card>
                  </motion.div>
                )
              })}
            </div>

            {/* Result Message */}
            <AnimatePresence>
              {showResult && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Card
                    className={`p-4 text-center ${
                      selectedOption === correctDirector.name
                        ? "bg-green-500/10 border-green-500/50"
                        : "bg-red-500/10 border-red-500/50"
                    }`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      className="text-2xl lg:text-3xl mb-2"
                    >
                      {selectedOption === correctDirector.name ? "🎉" : "😔"}
                    </motion.div>
                    <h3 className="text-lg lg:text-xl font-bold mb-1">
                      {selectedOption === correctDirector.name ? "¡Correcto!" : "Incorrecto"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedOption === correctDirector.name
                        ? `¡Excelente! ${correctDirector.name} dirigió ${movie.title}`
                        : `La respuesta correcta es ${correctDirector.name}`}
                    </p>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="default"
                disabled={!selectedOption}
                onClick={handleButtonClick}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(251,146,60,0.3)]"
              >
                {showResult ? (
                  <>
                    {currentRound >= roundData.length ? "Ver Resultados" : "Siguiente Ronda"}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  "Confirmar Respuesta"
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}