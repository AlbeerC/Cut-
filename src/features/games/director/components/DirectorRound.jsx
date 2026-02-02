import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronRight, Film, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useDirectorContext } from "../context/DirectorContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAsyncLock } from "../../hooks/useAsyncLock";

export default function DirectorRound() {
  const navigate = useNavigate();

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
    gameFinished,
  } = useDirectorContext();

  useEffect(() => {
    console.log(
      "[v0] DirectorRound - currentRound:",
      currentRound,
      "roundData.length:",
      roundData.length,
      "currentRoundData:",
      !!currentRoundData
    );

    if (roundData.length === 0) {
      console.error(
        "[v0] No hay datos de rondas, redirigiendo a configuración"
      );
      navigate("/games/director");
    }
  }, [roundData, currentRound, navigate]);

  if (!currentRoundData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-30">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Cargando ronda...</p>
          <Button onClick={() => navigate("/games/director")} variant="outline">
            Volver a configuración
          </Button>
        </div>
      </div>
    );
  }

  const { runSafe } = useAsyncLock()

  const { movie, correctDirector, options } = currentRoundData;

  const handleButtonClick = () => {
    if (!showResult) {
      runSafe(async () => {
        await confirmAnswer()
      })
      return;
    }

    if (gameFinished) {
      navigate("/games/director/finish");
      return;
    }

    runSafe(async () => {
      await nextRound()
    })
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      {/* Fixed Header - Progress & Movie Info */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto p-3 lg:p-4">
          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs lg:text-sm font-medium text-muted-foreground">
                Ronda {currentRound} de {rounds}
              </span>
              <span className="text-xs lg:text-sm font-medium text-primary">
                Puntos: {score * 10}
              </span>
            </div>
            <Progress value={(currentRound / rounds) * 100} className="h-1.5" />
          </motion.div>

          {/* Movie Info - Compact for mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3"
          >
            <div className="relative w-12 h-18 lg:w-35 lg:h-auto rounded overflow-hidden shadow-lg shadow-primary/20 flex-shrink-0">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                    : "/placeholder.svg?height=400&width=300"
                }
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Film className="w-4 h-4 text-primary flex-shrink-0" />
                <h2 className="text-sm lg:text-base font-bold text-muted-foreground">
                  ¿Quién dirigió esta película?
                </h2>
              </div>
              <h3 className="text-base lg:text-lg font-bold text-balance truncate">
                {movie.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                ({new Date(movie.release_date).getFullYear()})
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scrollable Content - Directors Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-3 lg:p-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-4 mb-2">
            {options.map((director, index) => {
              const isSelected = selectedOption === director.name;
              const isCorrectAnswer = director.name === correctDirector.name;
              const shouldShowCorrect = showResult && isCorrectAnswer;
              const shouldShowWrong =
                showResult && isSelected && !isCorrectAnswer;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    onClick={() => !showResult && selectOption(director.name)}
                    className={`relative cursor-pointer transition-all duration-300 overflow-hidden ${
                      isSelected && !showResult
                        ? "border-primary shadow-[0_0_30px_rgba(251,146,60,0.4)]"
                        : "border-border hover:border-primary/50"
                    } ${
                      shouldShowCorrect
                        ? "border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                        : ""
                    } ${
                      shouldShowWrong
                        ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                        : ""
                    } ${
                      showResult && !isSelected && !isCorrectAnswer
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    <div className="p-2 lg:p-3">
                      <div className="relative w-28 h-28 rounded-lg overflow-hidden mb-2 bg-muted flex items-center justify-center mx-auto">
                        {director.image ? (
                          <img
                            src={director.image || "/placeholder.svg"}
                            alt={director.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-8 h-8 lg:w-10 lg:h-10 text-muted-foreground/30" />
                        )}

                        {/* Result Badge */}
                        <AnimatePresence>
                          {shouldShowCorrect && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center"
                            >
                              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-green-500 flex items-center justify-center">
                                <Check
                                  className="w-5 h-5 lg:w-6 lg:h-6 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                            </motion.div>
                          )}
                          {shouldShowWrong && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute inset-0 bg-red-500/20 backdrop-blur-sm flex items-center justify-center"
                            >
                              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-red-500 flex items-center justify-center">
                                <X
                                  className="w-5 h-5 lg:w-6 lg:h-6 text-white"
                                  strokeWidth={3}
                                />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <h3 className="font-semibold text-center text-balance text-xs lg:text-sm leading-tight">
                        {director.name}
                      </h3>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Result Message */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <Card
                  className={`p-3 lg:p-4 text-center ${
                    selectedOption === correctDirector.name
                      ? "bg-green-500/10 border-green-500/50"
                      : "bg-red-500/10 border-red-500/50"
                  }`}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="text-xl lg:text-3xl mb-1.5"
                  >
                    {selectedOption === correctDirector.name ? "🎉" : "😔"}
                  </motion.div>
                  <h3 className="text-base lg:text-xl font-bold mb-1">
                    {selectedOption === correctDirector.name
                      ? "¡Correcto!"
                      : "Incorrecto"}
                  </h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    {selectedOption === correctDirector.name
                      ? `¡Excelente! ${correctDirector.name} dirigió ${movie.title}`
                      : `La respuesta correcta es ${correctDirector.name}`}
                  </p>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Fixed Footer - Action Button */}
      <div className="sticky bottom-0 z-10 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="max-w-7xl mx-auto p-3 lg:p-4">
          <motion.div whileTap={{ scale: 0.98 }}>
            <Button
              size="default"
              disabled={!selectedOption && !showResult}
              onClick={handleButtonClick}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(251,146,60,0.3)]"
            >
              {showResult ? (
                <>
                  {gameFinished ? "Ver Resultados" : "Siguiente Ronda"}
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
  );
}
