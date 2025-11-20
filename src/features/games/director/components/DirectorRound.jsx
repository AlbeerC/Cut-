import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, ChevronRight, Film } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function DirectorRound() {
  const [selectedDirector, setSelectedDirector] = useState(null)
  const [showResult, setShowResult] = useState(false)

  // Datos de ejemplo
  const currentRound = 3
  const totalRounds = 10
  const movie = {
    title: "Inception",
    poster: "/inception-movie-poster.png",
    year: 2010,
  }

  const directors = [
    {
      id: 1,
      name: "Christopher Nolan",
      image: "/christopher-nolan-director.jpg",
      isCorrect: true,
    },
    {
      id: 2,
      name: "Steven Spielberg",
      image: "/steven-spielberg-director.jpg",
      isCorrect: false,
    },
    {
      id: 3,
      name: "Denis Villeneuve",
      image: "/denis-villeneuve-director.jpg",
      isCorrect: false,
    },
    {
      id: 4,
      name: "Quentin Tarantino",
      image: "/quentin-tarantino-director.jpg",
      isCorrect: false,
    },
  ]

  const correctDirector = directors.find((d) => d.isCorrect)

  return (
    <div className="min-h-screen bg-background p-4 pt-30">
      <div className="max-w-7xl mx-auto">
        {/* Progress Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Ronda {currentRound} de {totalRounds}
            </span>
            <span className="text-sm font-medium text-primary">Puntos: 150</span>
          </div>
          <Progress value={(currentRound / totalRounds) * 100} className="h-2" />
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-center gap-6 items-start">
          {/* Movie Display - Left Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-1/3 flex-shrink-0"
          >
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-4 lg:p-6 sticky top-24">
              <h2 className="text-xl lg:text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
                <Film className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                ¿Quién dirigió esta película?
              </h2>
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-40 h-60 lg:w-48 lg:h-72 rounded-lg overflow-hidden shadow-2xl shadow-primary/20 mb-3"
                >
                  <img
                    src={movie.poster || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <h3 className="text-xl lg:text-2xl font-bold text-balance">{movie.title}</h3>
                <p className="text-muted-foreground">({movie.year})</p>
              </div>
            </Card>
          </motion.div>

          {/* Directors Grid - Right Side */}
          <div className="w-full lg:w-2/3 flex flex-col gap-4">
            <div className="flex flex-wrap gap-5 items-center">
              {directors.map((director, index) => {
                const isSelected = selectedDirector === director.id
                const isCorrectAnswer = director.isCorrect
                const shouldShowCorrect = showResult && isCorrectAnswer
                const shouldShowWrong = showResult && isSelected && !isCorrectAnswer

                return (
                  <motion.div
                    key={director.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      onClick={() => !showResult && setSelectedDirector(director.id)}
                      className={`relative cursor-pointer transition-all duration-300 overflow-hidden max-w-[250px] ${
                        isSelected && !showResult
                          ? "border-primary shadow-[0_0_30px_rgba(251,146,60,0.4)]"
                          : "border-border hover:border-primary/50"
                      } ${shouldShowCorrect ? "border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]" : ""} ${
                        shouldShowWrong ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]" : ""
                      } ${showResult && !isSelected && !isCorrectAnswer ? "opacity-50" : ""}`}
                    >
                      <div className="p-3 lg:p-4">
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2 lg:mb-3">
                          <img
                            src={director.image || "/placeholder.svg"}
                            alt={director.name}
                            className="w-full h-full object-cover"
                          />
                          {/* Result Badge */}
                          <AnimatePresence>
                            {shouldShowCorrect && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center"
                              >
                                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-green-500 flex items-center justify-center">
                                  <Check className="w-8 h-8 lg:w-10 lg:h-10 text-white" strokeWidth={3} />
                                </div>
                              </motion.div>
                            )}
                            {shouldShowWrong && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 bg-red-500/20 backdrop-blur-sm flex items-center justify-center"
                              >
                                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-red-500 flex items-center justify-center">
                                  <X className="w-8 h-8 lg:w-10 lg:h-10 text-white" strokeWidth={3} />
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <h3 className="font-semibold text-center text-balance text-sm lg:text-base">{director.name}</h3>
                      </div>
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
                    className={`p-4 lg:p-6 text-center ${
                      selectedDirector === correctDirector.id
                        ? "bg-green-500/10 border-green-500/50"
                        : "bg-red-500/10 border-red-500/50"
                    }`}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      className="text-3xl lg:text-4xl mb-2"
                    >
                      {selectedDirector === correctDirector.id ? "🎉" : "😔"}
                    </motion.div>
                    <h3 className="text-xl lg:text-2xl font-bold mb-2">
                      {selectedDirector === correctDirector.id ? "¡Correcto!" : "Incorrecto"}
                    </h3>
                    <p className="text-sm lg:text-base text-muted-foreground">
                      {selectedDirector === correctDirector.id
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
                disabled={!selectedDirector}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(251,146,60,0.3)]"
              >
                {showResult ? (
                  <>
                    Siguiente Ronda
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
