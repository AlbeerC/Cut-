'use client';

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Home, RotateCcw, Flame } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { useTimelineContext } from "../context/TimelineContext"

export default function TimelineFinal() {
  const navigate = useNavigate()

  const { totalPoints, rounds, resetGame, maxCombo, resultsHistory } = useTimelineContext()

  const maxPoints = rounds * 150 + (rounds - 1) * 50 // 150 base per round + 50 streak bonus (starts from 2nd perfect)
  const percentage = Math.round((totalPoints / maxPoints) * 100)
  const perfectRounds = resultsHistory.filter((r) => r.isPerfect).length

  const getPerformanceLevel = () => {
    if (percentage >= 90) return { title: "¡Maestro del Cine!", emoji: "🏆", color: "text-primary" }
    if (percentage >= 75) return { title: "¡Excelente!", emoji: "⭐", color: "text-primary" }
    if (percentage >= 60) return { title: "¡Bien hecho!", emoji: "👏", color: "text-accent" }
    return { title: "Sigue practicando", emoji: "💪", color: "text-muted-foreground" }
  }

  const performance = getPerformanceLevel()

  return (
    <div className="min-h-screen bg-background pt-30 px-4 pb-6">
      <div className="max-w-3xl mx-auto">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, x: Math.random() * window.innerWidth, opacity: 1 }}
              animate={{
                y: window.innerHeight + 100,
                rotate: Math.random() * 360,
                opacity: 0,
              }}
              transition={{
                duration: Math.random() * 2 + 3,
                delay: Math.random() * 0.5,
                ease: "linear",
              }}
              className="absolute w-2 h-2 rounded-sm"
              style={{
                backgroundColor:
                  i % 3 === 0 ? "hsl(var(--primary))" : i % 3 === 1 ? "hsl(var(--accent))" : "hsl(var(--muted))",
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Trophy className="w-10 h-10 text-white" />
              </div>
            </div>
          </motion.div>

          <h1 className={`text-3xl font-bold mb-2 ${performance.color}`}>
            {performance.title} {performance.emoji}
          </h1>
          <p className="text-sm text-muted-foreground">Juego completado</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-6 mb-4 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur border-2 border-primary/30">
            <div className="text-center mb-4">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                {totalPoints}
              </div>
              <div className="text-sm text-muted-foreground">de {maxPoints} puntos posibles</div>

              <div className="mt-3">
                <Badge className="text-lg px-4 py-1 bg-primary/20 text-primary border-primary/50">
                  {percentage}% precisión
                </Badge>
              </div>
            </div>

            <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-accent"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-center text-sm">
              <div className="p-2 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{perfectRounds}</div>
                <div className="text-xs text-muted-foreground">Rondas perfectas</div>
              </div>
              {maxCombo > 0 && (
                <div className="p-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
                  <div className="flex items-center justify-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-2xl font-bold text-orange-500">{maxCombo}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">Mejor combo</div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button
            size="lg"
            className="px-6 py-4 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            onClick={() => {
              resetGame()
              navigate("/games/timeline")
            }}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Volver a Jugar
          </Button>

          <Link to="/games">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-6 py-4 text-base font-semibold border-2 hover:bg-muted bg-transparent"
            >
              <Home className="w-4 h-4 mr-2" />
              Otros Juegos
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
