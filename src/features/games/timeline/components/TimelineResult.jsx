import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Star, Award, ArrowRight, Flame } from "lucide-react";
import { useNavigate } from "react-router";
import { useTimelineContext } from "../context/TimelineContext";
import { useAsyncLock } from "../../hooks/useAsyncLock";

export default function TimelineResult() {
  const navigate = useNavigate();
  const { runSafe } = useAsyncLock();

  const {
    roundResult,
    currentRound,
    rounds,
    nextRound,
    isLastRound,
    currentCombo,
    gameFinished,
  } = useTimelineContext();

  const { movies, correctCount, roundPoints, comboBonus, isPerfect } =
    roundResult;

  function handleNext() {
    if (isLastRound) {
      runSafe(async () => {
        await nextRound();
      })
      navigate("/games/timeline/finish");
    } else {
      runSafe(async () => {
        await nextRound();
      })
      navigate("/games/timeline/play");
    }
  }

  return (
    <div className="min-h-screen bg-background pt-30 px-4 pb-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-3"
        >
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                  <Badge className="text-lg px-4 py-1.5 bg-gradient-to-r from-primary to-accent relative">
                    <Award className="w-4 h-4 mr-1" />+{roundPoints}
                  </Badge>
                </div>
              </motion.div>

              {comboBonus > 0 && (
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <Badge className="text-base px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500">
                    <Flame className="w-4 h-4 mr-1" />x{currentCombo} +
                    {comboBonus}
                  </Badge>
                </motion.div>
              )}
            </div>

            <div className="text-right">
              <h1 className="text-xl font-bold leading-tight">
                {isPerfect ? (
                  <span className="text-primary">¡Perfecto! 🎉</span>
                ) : correctCount >= 2 ? (
                  <span>¡Bien hecho!</span>
                ) : (
                  <span className="text-muted-foreground">Casi...</span>
                )}
              </h1>
              <p className="text-sm text-muted-foreground">
                <span className="text-primary font-bold">{correctCount}/4</span>{" "}
                correctas
              </p>
            </div>
          </div>

          <div className="p-1.5 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progreso</span>
              <span className="font-semibold">
                {currentRound}/{rounds}
              </span>
            </div>
            <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentRound / rounds) * 100}%` }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="h-full bg-gradient-to-r from-primary to-accent"
              />
            </div>
          </div>
        </motion.div>

        <div className="space-y-1.5 mb-3">
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <Card
                className={`p-2 border transition-colors ${
                  movie.isCorrect
                    ? "bg-green-950/20 border-green-500/50"
                    : "bg-red-950/20 border-red-500/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`flex items-center justify-center w-7 h-7 rounded-full ${
                      movie.isCorrect ? "bg-green-500/20" : "bg-red-500/20"
                    }`}
                  >
                    {movie.isCorrect ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-red-500" />
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <Badge
                      variant={movie.isCorrect ? "default" : "destructive"}
                      className="text-sm px-2 py-0.5"
                    >
                      {movie.userPosition}
                    </Badge>
                    {!movie.isCorrect && (
                      <>
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        <Badge
                          variant="outline"
                          className="text-sm px-2 py-0.5 border-green-500/50 text-green-500"
                        >
                          {movie.correctPosition}
                        </Badge>
                      </>
                    )}
                  </div>

                  <div className="relative w-14 h-20 shrink-0 rounded overflow-hidden bg-muted">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {movie.year}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent/20">
                    <Star className="w-3 h-3 text-accent fill-accent" />
                    <span className="text-xs font-bold text-accent">
                      {movie.rating?.toFixed(1) || "N/A"}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Button
            size="lg"
            className="px-6 py-3 text-sm font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity w-full"
            onClick={handleNext}
          >
            {gameFinished ? "Ver resultado final" : "Siguiente ronda"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
