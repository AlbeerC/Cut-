import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, TrendingUp, Target, Clock, Award, Home } from "lucide-react"
import { useNavigate } from "react-router"

export default function SixDegreesFinal() {
  const navigate = useNavigate()

  // Mock stats
  const stats = {
    totalGames: 5,
    totalPoints: 425,
    averageSteps: 3.4,
    bestTime: 95, // seconds
    perfectConnections: 2,
  }

  const recentGames = [
    { from: "Tom Hanks", to: "Leonardo DiCaprio", steps: 3, points: 85, optimal: true },
    { from: "Morgan Freeman", to: "Emma Stone", steps: 4, points: 70, optimal: false },
    { from: "Brad Pitt", to: "Jennifer Lawrence", steps: 2, points: 100, optimal: true },
    { from: "Denzel Washington", to: "Natalie Portman", steps: 5, points: 55, optimal: false },
    { from: "Will Smith", to: "Margot Robbie", steps: 3, points: 85, optimal: true },
  ]

  return (
    <div className="min-h-screen bg-background p-4 pt-30">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="text-6xl mb-3"
          >
            🏆
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Estadísticas de Six Degrees</h1>
          <p className="text-muted-foreground">Tu historial de conexiones</p>
        </motion.div>

        {/* Overall Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6"
        >
          <Card className="p-4 text-center bg-gradient-to-br from-primary/20 to-accent/20 border-primary/30">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{stats.totalPoints}</p>
            <p className="text-xs text-muted-foreground">Puntos totales</p>
          </Card>

          <Card className="p-4 text-center bg-card/50 backdrop-blur-sm">
            <Target className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">{stats.totalGames}</p>
            <p className="text-xs text-muted-foreground">Partidas</p>
          </Card>

          <Card className="p-4 text-center bg-card/50 backdrop-blur-sm">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">{stats.averageSteps}</p>
            <p className="text-xs text-muted-foreground">Promedio pasos</p>
          </Card>

          <Card className="p-4 text-center bg-card/50 backdrop-blur-sm">
            <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">
              {Math.floor(stats.bestTime / 60)}:{(stats.bestTime % 60).toString().padStart(2, "0")}
            </p>
            <p className="text-xs text-muted-foreground">Mejor tiempo</p>
          </Card>

          <Card className="p-4 text-center bg-card/50 backdrop-blur-sm">
            <Award className="w-6 h-6 mx-auto mb-2 text-accent" />
            <p className="text-2xl font-bold">{stats.perfectConnections}</p>
            <p className="text-xs text-muted-foreground">Conexiones perfectas</p>
          </Card>
        </motion.div>

        {/* Recent Games */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-lg font-semibold mb-3">Últimas Partidas</h2>
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="space-y-2">
              {recentGames.map((game, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {game.from} → {game.to}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {game.steps} pasos
                        </Badge>
                        {game.optimal && (
                          <Badge className="text-xs bg-accent">
                            <Trophy className="w-3 h-3 mr-1" />
                            Óptimo
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">{game.points}</p>
                      <p className="text-xs text-muted-foreground">puntos</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-3"
        >
          <Button variant="outline" size="lg" className="w-full bg-transparent" onClick={() => navigate("/games")}>
            <Home className="w-4 h-4 mr-2" />
            Menú Principal
          </Button>
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 font-bold shadow-[0_0_20px_rgba(251,146,60,0.3)]"
            onClick={() => navigate("/games/sixdegrees")}
          >
            Nueva Partida
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
