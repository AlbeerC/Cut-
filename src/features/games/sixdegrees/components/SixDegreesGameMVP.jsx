import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Search,
  Undo2,
  Film,
  Lightbulb,
  Award,
  Timer,
  Flag,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useSixDegrees } from "../context/SixDegreesContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function SixDegreesGameMVP() {
  const router = useNavigate();
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
    handleSearch,
    handleSelectActor,
    handleUndo,
    handleGiveUp,
    useHint: requestHint,
    setTimeRemaining,
    startTimer,
    stopTimer,
    setGameLost,
    setLossReason,
  } = useSixDegrees();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showGiveUpDialog, setShowGiveUpDialog] = useState(false);
  const [showHintDialog, setShowHintDialog] = useState(false);
  const [showUndoDialog, setShowUndoDialog] = useState(false);

  useEffect(() => {
    if (config.timeLimit && timeRemaining > 0 && !gameWon) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setGameLost(true);
            setLossReason("timeout");
            // Navigate after a brief delay
            setTimeout(() => {
              router("/games/sixdegrees/result");
            }, 1500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      startTimer(timer);

      return () => {
        clearInterval(timer);
      };
    }
  }, [config.timeLimit, gameWon]);

  useEffect(() => {
    if (gameWon) {
      stopTimer();
      // Short delay just for animation smoothness
      const timeout = setTimeout(() => {
        router("/games/sixdegrees/result");
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [gameWon, router, stopTimer]);

  if (!actorA || !actorB) {
    router("/games/sixdegrees");
    return null;
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const isTimeRunningOut =
    config.timeLimit && timeRemaining < 30 && timeRemaining > 0;

  const handleHintConfirm = () => {
    setShowHintDialog(false);
    requestHint();
  };

  const handleUndoConfirm = () => {
    setShowUndoDialog(false);
    handleUndo();
  };

  const handleGiveUpConfirm = () => {
    setShowGiveUpDialog(false);
    handleGiveUp();
    setTimeout(() => {
      router("/games/sixdegrees/result");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background p-4 pt-30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <h1 className="text-xl font-bold">Six Degrees</h1>
            <div className="flex items-center gap-2 flex-wrap">
              {config.timeLimit && (
                <Badge
                  className={`text-xs px-2 py-1 ${
                    isTimeRunningOut ? "bg-red-500 text-white" : "bg-primary"
                  }`}
                >
                  <Timer className="w-3 h-3 mr-1" />
                  {formatTime(timeRemaining)}
                </Badge>
              )}
              <Badge className="text-xs px-2 py-1 bg-primary">
                Pasos: {chain.length - 1}/{config.maxSteps}
              </Badge>
              <Badge className="text-xs px-2 py-1 bg-accent">
                <Award className="w-3 h-3 mr-1" />
                Pistas: {hintsUsed}/3
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Objetivo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20 mb-4">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary flex-shrink-0">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actorA.profile_path}`}
                    alt={actorA.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Desde</p>
                  <p className="font-semibold text-sm leading-tight">
                    {actorA.name}
                  </p>
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Hasta</p>
                  <p className="font-semibold text-sm leading-tight">
                    {actorB.name}
                  </p>
                </div>
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-accent flex-shrink-0">
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

        <Card className="p-4 mb-4 bg-card/50 backdrop-blur-sm">
          <h3 className="text-sm font-semibold mb-3">Cadena de conexión:</h3>
          <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-2">
            {chain.map((link, index) => (
              <div key={index} className="flex items-center gap-2 flex-wrap">
                {/* Película ANTES del actor (excepto el primero) */}
                {index > 0 && link.movie && (
                  <>
                    <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />

                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-primary/10 rounded px-2 py-1"
                    >
                      <div className="flex items-center gap-1">
                        <Film className="w-3 h-3 text-primary flex-shrink-0" />
                        <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                          {link.movie.title} ({link.movie.year})
                        </p>
                      </div>
                    </motion.div>

                    <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                  </>
                )}

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

                  <p className="text-xs font-medium truncate max-w-[120px]">
                    {link.actor.name}
                  </p>
                </motion.div>
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
                  <Award className="w-8 h-8 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">¡Conectado!</h3>
                    <p className="text-sm text-muted-foreground">
                      Completaste la conexión en {chain.length - 1} pasos
                    </p>
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

            {/* Mensaje de error o hint */}
            <AnimatePresence mode="wait">
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mb-3 p-3 rounded-lg text-sm flex items-start gap-2 ${
                    errorMessage.startsWith("💡")
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "bg-destructive/20 text-destructive border border-destructive/30"
                  }`}
                >
                  {!errorMessage.startsWith("💡") && (
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  )}
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {isSearching && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Buscando...</span>
              </div>
            )}

            {isValidating && (
              <div className="flex items-center gap-2 text-sm text-primary mb-3">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Validando conexión...</span>
              </div>
            )}

            {!isSearching &&
              searchQuery.trim() &&
              searchResults.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-muted-foreground mb-3 p-3 bg-muted/50 rounded-lg"
                >
                  No se encontraron actores con ese nombre
                </motion.div>
              )}

            {/* Resultados de búsqueda */}
            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {searchResults.map((actor) => (
                  <motion.div
                    key={actor.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleSelectActor(actor)}
                    className="flex items-center gap-3 p-2 bg-secondary/50 hover:bg-secondary rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs">
                          ?
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {actor.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {actor.known_for_department || "Actor"} • Popularidad:{" "}
                        {Math.round(actor.popularity || 0)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={() => setShowUndoDialog(true)}
            disabled={chain.length <= 1 || isValidating || gameWon}
            className="flex-1 bg-transparent"
          >
            <Undo2 className="w-4 h-4 mr-2" />
            Deshacer
            {undoCount === 0 && (
              <span className="ml-1 text-xs text-destructive">(-2pts)</span>
            )}
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowHintDialog(true)}
            disabled={hintsUsed >= 3 || isValidating || gameWon}
            className="flex-1 bg-transparent"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Pista ({3 - hintsUsed})
            <span className="ml-1 text-xs text-destructive">(-10pts)</span>
          </Button>

          <Button
            variant="destructive"
            onClick={() => setShowGiveUpDialog(true)}
            disabled={isValidating || gameWon}
            className="flex-1 col-span-2 md:col-span-1"
          >
            <Flag className="w-4 h-4 mr-2" />
            Rendirse
          </Button>
        </div>
      </div>

      <AlertDialog open={showHintDialog} onOpenChange={setShowHintDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Usar una pista?</AlertDialogTitle>
            <AlertDialogDescription>
              Esto te costará 10 puntos de tu puntuación final. Te quedan{" "}
              {3 - hintsUsed} pistas disponibles.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleHintConfirm}>
              Usar Pista
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showUndoDialog} onOpenChange={setShowUndoDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Deshacer último paso?</AlertDialogTitle>
            <AlertDialogDescription>
              Esto te costará 2 puntos de tu puntuación final.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleUndoConfirm}>
              Deshacer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showGiveUpDialog} onOpenChange={setShowGiveUpDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Rendirse?</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres rendirte? Perderás esta partida y no
              se guardará tu progreso.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continuar Jugando</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleGiveUpConfirm}
              className="bg-destructive"
            >
              Sí, Rendirse
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
