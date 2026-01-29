import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, Trophy, Users, Loader2, HelpCircle } from "lucide-react";
import { useSixDegrees } from "../context/SixDegreesContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/features/auth/context/AuthContext";
import { startSixDegreesGame } from "../db/points.db";

export default function SixDegreesConfig() {
  const router = useNavigate();
  const { updateConfig, selectRandomActors, setGameId } = useSixDegrees();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
  const [selectedMode, setSelectedMode] = useState("classic");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();

  const difficulties = {
    easy: {
      maxSteps: 8,
      label: "Fácil",
      description: "Hasta 8 pasos",
      icon: Zap,
      color: "text-green-500",
    },
    medium: {
      maxSteps: 6,
      label: "Media",
      description: "Hasta 6 pasos",
      icon: Clock,
      color: "text-primary",
    },
    hard: {
      maxSteps: 4,
      label: "Difícil",
      description: "Hasta 4 pasos",
      icon: Trophy,
      color: "text-red-500",
    },
  };

  const modes = {
    classic: {
      timeLimit: null,
      label: "Clásico",
      description: "Sin límite de tiempo",
      icon: Users,
    },
    blitz: {
      timeLimit: 120,
      label: "Relámpago",
      description: "2 minutos",
      icon: Zap,
    },
  };

  const handleStart = async () => {
    setIsLoading(true);

    updateConfig({
      maxSteps: difficulties[selectedDifficulty].maxSteps,
      timeLimit: modes[selectedMode].timeLimit,
      difficulty: selectedDifficulty,
    });

    try {
      await selectRandomActors();
      const gameId = await startSixDegreesGame(user.id);

      setGameId(gameId);
      router("/games/sixdegrees/play");
    } catch (error) {
      console.error("Error starting game:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 pt-30 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Conectados
            </h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <HelpCircle className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>¿Cómo Jugar?</DialogTitle>
                  <DialogDescription asChild>
                    <div className="space-y-3 text-left">
                      <p className="text-sm">
                        <strong>Objetivo:</strong> Conecta dos actores a través
                        de películas en las que trabajaron juntos.
                      </p>
                      <p className="text-sm">
                        <strong>Reglas:</strong>
                      </p>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                        <li>Comienza con el actor inicial</li>
                        <li>
                          Busca otro actor que haya trabajado con él en alguna
                          película
                        </li>
                        <li>Continúa hasta llegar al actor objetivo</li>
                        <li>
                          Mientras menos pasos uses, mejor puntuación obtendrás
                        </li>
                      </ul>
                      <p className="text-sm">
                        <strong>Ayudas:</strong> Puedes usar hasta 3 pistas y
                        deshacer pasos, pero te restarán puntos.
                      </p>
                      <p className="text-sm">
                        <strong>Puntuación:</strong> Bonus por rutas óptimas,
                        velocidad y no usar ayudas.
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-muted-foreground">
            Conecta dos actores a través de películas compartidas
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Difficulty Selection */}
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
            <h2 className="text-lg font-semibold mb-3">Dificultad</h2>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(difficulties).map(([key, diff]) => {
                const Icon = diff.icon;
                const isSelected = selectedDifficulty === key;
                return (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card
                      onClick={() => setSelectedDifficulty(key)}
                      className={`p-4 text-center cursor-pointer border-2 transition-all ${
                        isSelected
                          ? "border-primary shadow-[0_0_20px_rgba(251,146,60,0.3)]"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${diff.color}`} />
                      <h3 className="font-semibold text-sm mb-1">
                        {diff.label}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {diff.description}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          {/* Game Mode */}
          {/*           <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
            <h2 className="text-lg font-semibold mb-3">Modo de Juego</h2>
            <div className="space-y-2">
              {Object.entries(modes).map(([key, mode]) => {
                const Icon = mode.icon
                const isSelected = selectedMode === key
                return (
                  <motion.div key={key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      onClick={() => setSelectedMode(key)}
                      className={`p-3 cursor-pointer border-2 transition-all ${
                        isSelected
                          ? "border-primary shadow-[0_0_15px_rgba(251,146,60,0.2)]"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{mode.label}</h3>
                          <p className="text-xs text-muted-foreground">{mode.description}</p>
                        </div>
                        {isSelected && <Badge className="bg-primary text-xs">Seleccionado</Badge>}
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </Card> */}

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              onClick={handleStart}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 font-bold shadow-[0_0_25px_rgba(251,146,60,0.4)]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Preparando juego...
                </>
              ) : (
                "Comenzar Juego"
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
