import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Award, ArrowRight } from "lucide-react"

const rankings = [
  { rank: 1, name: "CineManiac", points: 15420, avatar: "🎬" },
  { rank: 2, name: "FilmBuff2024", points: 14890, avatar: "🎥" },
  { rank: 3, name: "MovieMaster", points: 13750, avatar: "🍿" },
  { rank: 4, name: "ReelExpert", points: 12980, avatar: "🎞️" },
  { rank: 5, name: "CinemaKing", points: 11560, avatar: "👑" },
]

export default function CommunitySection() {
  return (
    <section id="ranking" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                Únete a la{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">comunidad</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Compite en torneos semanales, sube en el ranking global y conecta con otros fanáticos del cine de todo
                el mundo.
              </p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-border bg-card">
                <CardContent className="p-6 space-y-2">
                  <Users className="w-8 h-8 text-primary" />
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-sm text-muted-foreground">Miembros activos</div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6 space-y-2">
                  <TrendingUp className="w-8 h-8 text-accent" />
                  <div className="text-3xl font-bold">500+</div>
                  <div className="text-sm text-muted-foreground">Torneos mensuales</div>
                </CardContent>
              </Card>
            </div>

            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group">
              Unirse Ahora
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Right content - Rankings */}
          <Card className="border-border bg-card/50 backdrop-blur">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  Top Jugadores
                </h3>
                <span className="text-sm text-muted-foreground">Esta semana</span>
              </div>

              <div className="space-y-3">
                {rankings.map((player) => (
                  <div
                    key={player.rank}
                    className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        player.rank === 1
                          ? "bg-primary text-primary-foreground"
                          : player.rank === 2
                            ? "bg-accent text-accent-foreground"
                            : player.rank === 3
                              ? "bg-chart-3 text-foreground"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {player.rank}
                    </div>

                    <div className="text-2xl">{player.avatar}</div>

                    <div className="flex-1">
                      <div className="font-semibold">{player.name}</div>
                      <div className="text-sm text-muted-foreground">{player.points.toLocaleString()} puntos</div>
                    </div>

                    {player.rank <= 3 && (
                      <Award
                        className={`w-5 h-5 ${
                          player.rank === 1 ? "text-primary" : player.rank === 2 ? "text-accent" : "text-chart-3"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full bg-transparent">
                Ver Ranking Completo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
