import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, ArrowRight, Film, Award, Lightbulb, TrendingUp, Undo2 } from "lucide-react"
import { useSixDegrees } from "../context/SixDegreesContext"
import { useNavigate } from "react-router"
import { useEffect } from "react"

export default function SixDegreesResult() {
  const navigate = useNavigate()
  const { actorA, actorB, chain, config, hintsUsed, undoCount, score, selectRandomActors } = useSixDegrees()

  const handlePlayAgain = async () => {
    await selectRandomActors()
    navigate("/games/sixdegrees/play")
  }

  const handleNewConfig = () => {
    navigate("/games/sixdegrees")
  }

  if (!actorA || !actorB || chain.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando resultados...</p>
      </div>
    )
  }


  useEffect(() => {window.scrollTo(0, 0)}, [])

  return (
    <div className="min-h-screen bg-background p-3 pt-30 pb-20">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="text-5xl mb-2"
          >
            🎉
          </motion.div>
          <h1 className="text-2xl font-bold mb-1">¡Conexión Exitosa!</h1>
          <p className="text-sm text-muted-foreground">
            Conectaste {actorA.name} con {actorB.name}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-4"
        >
          <Card className="p-3 text-center bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30">
            <Trophy className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-xl font-bold">{score}</p>
            <p className="text-xs text-muted-foreground">Puntos</p>
          </Card>

          <Card className="p-3 text-center bg-card/50 backdrop-blur-sm">
            <TrendingUp className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-xl font-bold">{chain.length - 1}</p>
            <p className="text-xs text-muted-foreground">Tus pasos</p>
          </Card>

          <Card className="p-3 text-center bg-card/50 backdrop-blur-sm">
            <Lightbulb className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-xl font-bold">{hintsUsed}</p>
            <p className="text-xs text-muted-foreground">Pistas</p>
          </Card>

          <Card className="p-3 text-center bg-card/50 backdrop-blur-sm">
            <Undo2 className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-xl font-bold">{undoCount}</p>
            <p className="text-xs text-muted-foreground">Deshacer</p>
          </Card>
        </motion.div>

        {/* Score Breakdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="p-3 mb-3 bg-card/50 backdrop-blur-sm">
            <h2 className="text-base font-semibold mb-2">Desglose de Puntuación</h2>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-xs">Puntos base</span>
                <span className="font-semibold text-sm">+100</span>
              </div>
              {chain.length - 1 > 2 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-xs">Pasos extra ({chain.length - 1 - 2})</span>
                  <span className="font-semibold text-sm text-red-400">-{(chain.length - 1 - 2) * 15}</span>
                </div>
              )}
              {hintsUsed > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-xs">Pistas usadas ({hintsUsed})</span>
                  <span className="font-semibold text-sm text-red-400">-{hintsUsed * 10}</span>
                </div>
              )}
              {undoCount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-xs">Deshacer ({undoCount})</span>
                  <span className="font-semibold text-sm text-red-400">-{undoCount * 2}</span>
                </div>
              )}
              {chain.length - 1 === 2 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-xs">Ruta óptima</span>
                  <span className="font-semibold text-sm text-accent">+50</span>
                </div>
              )}
              {hintsUsed === 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-xs">Sin pistas</span>
                  <span className="font-semibold text-sm text-accent">+30</span>
                </div>
              )}
              <div className="border-t border-border pt-1.5 mt-1.5 flex justify-between items-center">
                <span className="font-semibold text-sm">Total</span>
                <span className="text-xl font-bold text-primary">{score}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Your Path */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-3 mb-4 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold">Tu Ruta</h2>
              <Badge className="bg-primary text-xs py-0.5">
                <Award className="w-3 h-3 mr-1" />
                {chain.length - 1} pasos
              </Badge>
            </div>
            <div className="space-y-2">
              {chain.map((link, index) => (
                <div key={index}>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-6 h-6 flex items-center justify-center text-xs shrink-0">
                      {index + 1}
                    </Badge>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden bg-muted flex-shrink-0">
                        {link.actor.profile_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${link.actor.profile_path}`}
                            alt={link.actor.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <span className="font-medium text-sm truncate">{link.actor.name}</span>
                    </div>
                  </div>
                  {link.movie && (
                    <div className="ml-10 mt-1 flex items-center gap-1.5">
                      <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
                      <Badge variant="outline" className="text-xs py-0">
                        <Film className="w-3 h-3 mr-1" />
                        <span className="truncate">
                          {link.movie.title} ({link.movie.year})
                        </span>
                      </Badge>
                    </div>
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
          className="grid grid-cols-2 gap-2"
        >
          <Button variant="outline" size="default" onClick={handleNewConfig} className="w-full bg-transparent text-sm">
            Nueva Config
          </Button>
          <Button
            size="default"
            onClick={handlePlayAgain}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 font-bold shadow-[0_0_20px_rgba(251,146,60,0.3)] text-sm"
          >
            Jugar de Nuevo
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
