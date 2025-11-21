import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, ArrowRight, Film, Award, Clock, Lightbulb, TrendingUp } from "lucide-react"

export default function SixDegreesResult() {
  // Mock data
  const userPath = [
    { actor: "Tom Hanks", movie: "Cast Away" },
    { actor: "Helen Hunt", movie: "As Good as It Gets" },
    { actor: "Jack Nicholson", movie: "The Departed" },
    { actor: "Leonardo DiCaprio", movie: null },
  ]

  const optimalPath = [
    { actor: "Tom Hanks", movie: "The Green Mile" },
    { actor: "Tom Cruise", movie: "Interview with the Vampire" },
    { actor: "Brad Pitt", movie: "Once Upon a Time in Hollywood" },
    { actor: "Leonardo DiCaprio", movie: null },
  ]

  const stats = {
    yourSteps: 3,
    optimalSteps: 3,
    timeUsed: 142, // seconds
    hintsUsed: 1,
    points: 85,
  }

  return (
    <div className="min-h-screen bg-background p-4 pt-30">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
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
            🎉
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">¡Conexión Exitosa!</h1>
          <p className="text-muted-foreground">Has conectado a los dos actores</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          <Card className="p-4 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{stats.points}</p>
            <p className="text-xs text-muted-foreground">Puntos</p>
          </Card>

          <Card className="p-4 text-center bg-card/50 backdrop-blur-sm">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{stats.yourSteps}</p>
            <p className="text-xs text-muted-foreground">Tus pasos</p>
          </Card>

          <Card className="p-4 text-center bg-card/50 backdrop-blur-sm">
            <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">
              {Math.floor(stats.timeUsed / 60)}:{(stats.timeUsed % 60).toString().padStart(2, "0")}
            </p>
            <p className="text-xs text-muted-foreground">Tiempo</p>
          </Card>

          <Card className="p-4 text-center bg-card/50 backdrop-blur-sm">
            <Lightbulb className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-2xl font-bold">{stats.hintsUsed}</p>
            <p className="text-xs text-muted-foreground">Pistas usadas</p>
          </Card>
        </motion.div>

        {/* Your Path */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-4 mb-4 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Tu Ruta</h2>
              <Badge className="bg-primary">
                <Award className="w-3 h-3 mr-1" />
                {stats.yourSteps} pasos
              </Badge>
            </div>
            <div className="space-y-2">
              {userPath.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-6 h-6 flex items-center justify-center text-xs shrink-0">
                    {index + 1}
                  </Badge>
                  <span className="font-medium">{step.actor}</span>
                  {step.movie && (
                    <>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      <Badge variant="outline" className="text-xs">
                        <Film className="w-3 h-3 mr-1" />
                        {step.movie}
                      </Badge>
                    </>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Optimal Path */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="p-4 mb-6 bg-card/50 backdrop-blur-sm border-accent/20">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">Ruta Óptima</h2>
              <Badge variant="outline" className="border-accent">
                <Trophy className="w-3 h-3 mr-1 text-accent" />
                {stats.optimalSteps} pasos
              </Badge>
            </div>
            <div className="space-y-2">
              {optimalPath.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Badge variant="secondary" className="w-6 h-6 flex items-center justify-center text-xs shrink-0">
                    {index + 1}
                  </Badge>
                  <span className="font-medium">{step.actor}</span>
                  {step.movie && (
                    <>
                      <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      <Badge variant="outline" className="text-xs">
                        <Film className="w-3 h-3 mr-1" />
                        {step.movie}
                      </Badge>
                    </>
                  )}
                </div>
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
          <Button variant="outline" size="lg" className="w-full bg-transparent">
            Ver Estadísticas
          </Button>
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 font-bold shadow-[0_0_20px_rgba(251,146,60,0.3)]"
          >
            Jugar de Nuevo
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
