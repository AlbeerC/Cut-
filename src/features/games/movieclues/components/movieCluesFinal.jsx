import { motion } from "framer-motion"
import { Trophy, Star, Target, Eye, Home, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link, useNavigate } from "react-router"
import Confetti from "react-confetti"
import { useEffect, useState } from "react"
import { useMovieCluesContext } from "../context/MovieCluesContext"

export default function MovieCluesFinal() {
  const navigate = useNavigate()
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [showConfetti, setShowConfetti] = useState(true)

  const { score, rounds, totalPoints, resetGame } = useMovieCluesContext()

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  const maxPoints = rounds * 150 // Maximum points if all correct on first try
  const accuracy = (score / rounds) * 100
  const wrongAnswers = rounds - score

  const getPerformanceMessage = () => {
    if (accuracy >= 80) return "¡Maestro Detective! 🕵️"
    if (accuracy >= 60) return "¡Gran Ojo Cinematográfico! 👁️"
    if (accuracy >= 40) return "¡Buen Esfuerzo! 🎬"
    return "¡Sigue Mirando Películas! 🎞️"
  }

  const getPerformanceColor = () => {
    if (accuracy >= 80) return "from-green-500 to-emerald-500"
    if (accuracy >= 60) return "from-primary to-accent"
    if (accuracy >= 40) return "from-yellow-500 to-orange-500"
    return "from-red-500 to-orange-500"
  }

  const handlePlayAgain = () => {
    resetGame()
    navigate("/games/movieclues")
  }

  return (
    <div className="min-h-screen bg-background p-4 pt-30">
      {showConfetti && accuracy >= 60 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={accuracy >= 80 ? 500 : 300}
          colors={["#fb9220", "#fbbf24", "#f97316", "#ea580c"]}
        />
      )}

      <div className="max-w-4xl mx-auto">
        {/* Trophy Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="text-center mb-6"
        >
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${getPerformanceColor()} mb-3 shadow-2xl shadow-primary/50`}
          >
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">¡Juego Terminado!</h1>
          <p className="text-lg text-muted-foreground">{getPerformanceMessage()}</p>
        </motion.div>

        {/* Score Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 mb-5">
            <div className="text-center mb-5">
              <div className="text-5xl font-bold mb-2">
                <span className="text-primary">{totalPoints}</span>
              </div>
              <p className="text-muted-foreground">Puntos Totales</p>
              <p className="text-xs text-muted-foreground mt-1">de {maxPoints} posibles</p>
            </div>

            {/* Accuracy Bar */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Precisión</span>
                <span className="text-sm font-bold text-primary">{accuracy.toFixed(0)}%</span>
              </div>
              <div className="h-4 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${accuracy}%` }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className={`h-full bg-gradient-to-r ${getPerformanceColor()} shadow-[0_0_10px_rgba(251,146,60,0.5)]`}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-green-500/10 border-green-500/30 p-3 text-center">
                  <Target className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <div className="text-xl font-bold text-green-500">{score}</div>
                  <div className="text-xs text-muted-foreground">Correctas</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="bg-red-500/10 border-red-500/30 p-3 text-center">
                  <Eye className="w-5 h-5 text-red-500 mx-auto mb-1" />
                  <div className="text-xl font-bold text-red-500">{wrongAnswers}</div>
                  <div className="text-xs text-muted-foreground">Falladas</div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="bg-primary/10 border-primary/30 p-3 text-center">
                  <Star className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-xl font-bold text-primary">{totalPoints}</div>
                  <div className="text-xs text-muted-foreground">Puntos</div>
                </Card>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              onClick={handlePlayAgain}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black font-bold h-12 shadow-[0_0_30px_rgba(251,146,60,0.4)]"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Jugar de Nuevo
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/games">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-primary/50  font-bold h-12 bg-transparent"
              >
                <Home className="w-5 h-5 mr-2" />
                Volver al Menú
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
