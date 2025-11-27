import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Clock, Trophy, Users } from "lucide-react"
import { useNavigate } from "react-router"
import { useEffect } from "react"

export default function SixDegreesConfig() {
  const navigate = useNavigate()

  useEffect(() => window.scrollTo(0, 0), [])

  return (
    <div className="min-h-screen bg-background p-4 pt-30 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Six Degrees</h1>
          <p className="text-muted-foreground">Conecta dos actores a través de películas compartidas</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Difficulty Selection */}
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
            <h2 className="text-lg font-semibold mb-0">Dificultad</h2>
            <div className="grid grid-cols-3 gap-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card className="px-4 py-2 text-center cursor-pointer border-2 border-border hover:border-primary/50 transition-colors gap-2">
                  <Zap className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <h3 className="font-semibold text-sm mb-1">Fácil</h3>
                  <p className="text-xs text-muted-foreground">2-3 pasos</p>
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card className="px-4 py-2 text-center cursor-pointer border-2 border-primary shadow-[0_0_20px_rgba(251,146,60,0.3)] transition-colors gap-2">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold text-sm mb-1">Media</h3>
                  <p className="text-xs text-muted-foreground">3-4 pasos</p>
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card className="px-4 py-2 text-center cursor-pointer border-2 border-border hover:border-primary/50 transition-colors gap-2">
                  <Trophy className="w-6 h-6 mx-auto mb-2 text-red-500" />
                  <h3 className="font-semibold text-sm mb-1">Difícil</h3>
                  <p className="text-xs text-muted-foreground">4-6 pasos</p>
                </Card>
              </motion.div>
            </div>
          </Card>

          {/* Game Mode */}
          <Card className="p-4 bg-card/50 backdrop-blur-sm border-primary/20">
            <h2 className="text-lg font-semibold mb-0">Modo de Juego</h2>
            <div className="space-y-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="p-3 cursor-pointer border-2 border-primary shadow-[0_0_15px_rgba(251,146,60,0.2)] transition-colors gap-2">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">Clásico</h3>
                      <p className="text-xs text-muted-foreground">Sin límite de tiempo</p>
                    </div>
                    <Badge className="bg-primary text-xs">Seleccionado</Badge>
                  </div>
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="p-3 cursor-pointer border-2 border-border hover:border-primary/50 transition-colors gap-2">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">Contrarreloj</h3>
                      <p className="text-xs text-muted-foreground">3 minutos para conectar</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </Card>

          {/* Start Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 font-bold shadow-[0_0_25px_rgba(251,146,60,0.4)]"
              onClick={() => navigate("/games/sixdegrees/play")}
            >
              Comenzar Juego
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
