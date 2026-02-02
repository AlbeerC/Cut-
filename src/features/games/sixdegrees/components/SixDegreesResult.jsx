import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  ArrowRight,
  Film,
  Award,
  Lightbulb,
  TrendingUp,
  Undo2,
  XCircle,
} from "lucide-react";
import { useSixDegrees } from "../context/SixDegreesContext";

export default function SixDegreesResult() {
  const router = useNavigate();
  const {
    actorA,
    actorB,
    chain,
    config,
    hintsUsed,
    undoCount,
    score,
    selectRandomActors,
    gameWon,
    gameLost,
    lossReason,
    timeRemaining,
    initialTime,
  } = useSixDegrees();

  const handleNewConfig = () => {
    router("/games/sixdegrees");
  };

  if (!actorA || !actorB) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="p-8 max-w-md text-center">
          <p className="text-muted-foreground mb-4">
            No hay datos de partida disponibles
          </p>
          <Button onClick={() => router("/games/sixdegrees")}>
            Volver al Inicio
          </Button>
        </Card>
      </div>
    );
  }

  const getBaseScore = () => {
    if (config.difficulty === "easy") {
      return 200
    } else if (config.difficulty === "medium") {
      return 300
    } else {
      return 400
    }
  }

  const baseScore = getBaseScore()
  const isWin = gameWon && chain.length > 0;
  const isLoss = gameLost;
  const timeUsed = initialTime ? initialTime - timeRemaining : 0;

  return (
    <div className="min-h-screen bg-background p-4 pt-30">
      <div className="max-w-4xl mx-auto">
        {/* Success/Failure Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="text-6xl mb-3"
          >
            {isWin ? "🎉" : "😔"}
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">
            {isWin ? "¡Conexión Exitosa!" : "Partida Terminada"}
          </h1>
          <p className="text-muted-foreground">
            {isWin
              ? `Conectaste ${actorA.name} con ${actorB.name}`
              : lossReason === "timeout"
                ? "Se acabó el tiempo"
                : "Te rendiste"}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          {isWin && (
            <Card className="p-4 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{score}</p>
              <p className="text-xs text-muted-foreground">Puntos</p>
            </Card>
          )}

          {!isWin && (
            <Card className="p-4 text-center bg-muted/50">
              <XCircle className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-2xl font-bold">-</p>
              <p className="text-xs text-muted-foreground">No completado</p>
            </Card>
          )}

          <Card className="p-4 text-center bg-card/50 backdrop-blur-sm">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{chain.length - 1}</p>
            <p className="text-xs text-muted-foreground">Tus pasos</p>
          </Card>

          <Card className="p-4 text-center bg-card/50 backdrop-blur-sm">
            <Lightbulb className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">{hintsUsed}</p>
            <p className="text-xs text-muted-foreground">Pistas usadas</p>
          </Card>

          <Card className="p-4 text-center bg-card/50 backdrop-blur-sm">
            <Undo2 className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">{undoCount}</p>
            <p className="text-xs text-muted-foreground">Veces deshecho</p>
          </Card>
        </motion.div>

        {/* Score Breakdown - only if won */}
        {isWin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="p-4 mb-4 bg-card/50 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-3">
                Desglose de Puntuación
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Puntos base</span>
                  <span className="font-semibold">{baseScore}</span>
                </div>
                {chain.length - 1 > config.maxSteps && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Pasos extra ({chain.length - 1 - config.maxSteps})
                    </span>
                    <span className="font-semibold text-red-400">
                      -{(chain.length - 1 - config.maxSteps) * 15}
                    </span>
                  </div>
                )}
                {chain.length - 1 <= config.maxSteps && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Dentro del límite de pasos
                    </span>
                    <span className="font-semibold text-accent">+150</span>
                  </div>
                )}
                {hintsUsed > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Pistas usadas ({hintsUsed})
                    </span>
                    <span className="font-semibold text-red-400">
                      -{hintsUsed * 25}
                    </span>
                  </div>
                )}
                {undoCount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Deshacer ({undoCount})
                    </span>
                    <span className="font-semibold text-red-400">
                      -{undoCount * 10}
                    </span>
                  </div>
                )}
                {(chain.length - 1 === 2 || chain.length - 1 === 1) && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Ruta óptima</span>
                    <span className="font-semibold text-accent">+50</span>
                  </div>
                )}
                {hintsUsed === 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Sin pistas</span>
                    <span className="font-semibold text-accent">+50</span>
                  </div>
                )}
                {initialTime &&
                  timeRemaining > 0 &&
                  timeRemaining / initialTime > 0.5 && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">
                        Bonus de tiempo
                      </span>
                      <span className="font-semibold text-accent">+20</span>
                    </div>
                  )}
                <div className="border-t border-border pt-2 mt-2 flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {score}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Your Path */}
        {chain.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 mb-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Tu Ruta</h2>
                <Badge className="bg-primary">
                  <Award className="w-3 h-3 mr-1" />
                  {chain.length - 1} pasos
                </Badge>
              </div>
              <div className="space-y-3">
                {chain.map((link, index) => (
                  <div key={index} className="space-y-2">
                    {/* Película ANTES del actor (excepto el primero) */}
                    {index > 0 && link.movie && (
                      <div className="ml-14 flex items-center gap-2 min-w-0">
                        <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                        <Badge
                          variant="outline"
                          className="text-xs max-w-[200px]"
                        >
                          <div className="flex items-center gap-1 min-w-0">
                            <Film className="w-3 h-3 shrink-0" />
                            <span className="truncate">
                              {link.movie.title} ({link.movie.year})
                            </span>
                          </div>
                        </Badge>
                      </div>
                    )}

                    {/* Actor */}
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="secondary"
                        className="w-8 h-8 flex items-center justify-center text-sm shrink-0"
                      >
                        {index + 1}
                      </Badge>

                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                          {link.actor.profile_path && (
                            <img
                              src={`https://image.tmdb.org/t/p/w200${link.actor.profile_path}`}
                              alt={link.actor.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>

                        <span
                          className="font-medium truncate"
                          title={link.actor.name}
                        >
                          {link.actor.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-3"
        >
          <Button
            size="lg"
            onClick={handleNewConfig}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 font-bold shadow-[0_0_20px_rgba(251,146,60,0.3)]"
          >
            Jugar de nuevo
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router("/games")}
            className="w-full bg-transparent"
          >
            Volver a juegos
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
