import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Clock, Trophy, Users } from "lucide-react"
import { useSixDegrees } from "../context/SixDegreesContext"
import { useNavigate } from "react-router"

export default function SixDegreesConfig() {
  const navigate = useNavigate()
  const { updateConfig, selectRandomActors } = useSixDegrees()

  const [selectedDifficulty, setSelectedDifficulty] = useState("medium")
  const [selectedMode, setSelectedMode] = useState("classic")
  const [isLoading, setIsLoading] = useState(false)

  const difficulties = {
    easy: { maxSteps: 3, label: "Fácil", description: "2-3 pasos", icon: Zap, color: "text-green-500" },
    medium: { maxSteps: 4, label: "Media", description: "3-4 pasos", icon: Clock, color: "text-primary" },
    hard: { maxSteps: 6, label: "Difícil", description: "4-6 pasos", icon: Trophy, color: "text-red-500" },
  }

  const modes = {
    classic: { timeLimit: null, label: "Clásico", description: "Sin límite de tiempo", icon: Users },
    timed: { timeLimit: 180, label: "Contrarreloj", description: "3 minutos para conectar", icon: Clock },
  }

  const handleStart = async () => {
    setIsLoading(true)

    const newConfig = {
      maxSteps: difficulties[selectedDifficulty].maxSteps,
      timeLimit: modes[selectedMode].timeLimit,
      difficulty: selectedDifficulty,
    }

    updateConfig(newConfig)

    await selectRandomActors()

    setTimeout(() => {
      navigate("/games/sixdegrees/play")
    }, 500)
  }

  useEffect(() => {window.scrollTo(0, 0)}, [])

  return (
    <div className="min-h-screen bg-background p-3 pt-30 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-1">Six Degrees</h1>
          <p className="text-sm text-muted-foreground">Conecta dos actores a través de películas compartidas</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          {/* Difficulty Selection */}
          <Card className="p-3 bg-card/50 backdrop-blur-sm border-primary/20">
            <h2 className="text-base font-semibold mb-2">Dificultad</h2>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(difficulties).map(([key, diff]) => {
                const Icon = diff.icon
                const isSelected = selectedDifficulty === key
                return (
                  <motion.div key={key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Card
                      onClick={() => setSelectedDifficulty(key)}
                      className={`p-3 text-center cursor-pointer border-2 transition-all ${
                        isSelected
                          ? "border-primary shadow-[0_0_20px_rgba(251,146,60,0.3)]"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon className={`w-5 h-5 mx-auto mb-1 ${diff.color}`} />
                      <h3 className="font-semibold text-xs mb-0.5">{diff.label}</h3>
                      <p className="text-xs text-muted-foreground">{diff.description}</p>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </Card>

          {/* Game Mode */}
          <Card className="p-3 bg-card/50 backdrop-blur-sm border-primary/20">
            <h2 className="text-base font-semibold mb-2">Modo de Juego</h2>
            <div className="space-y-2">
              {Object.entries(modes).map(([key, mode]) => {
                const Icon = mode.icon
                const isSelected = selectedMode === key
                return (
                  <motion.div key={key} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Card
                      onClick={() => setSelectedMode(key)}
                      className={`p-2.5 cursor-pointer border-2 transition-all ${
                        isSelected
                          ? "border-primary shadow-[0_0_15px_rgba(251,146,60,0.2)]"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{mode.label}</h3>
                          <p className="text-xs text-muted-foreground">{mode.description}</p>
                        </div>
                        {isSelected && <Badge className="bg-primary text-xs py-0">Seleccionado</Badge>}
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </Card>

          {/* Start Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              onClick={handleStart}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 font-bold shadow-[0_0_25px_rgba(251,146,60,0.4)]"
            >
              {isLoading ? "Cargando..." : "Comenzar Juego"}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
