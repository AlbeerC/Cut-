import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Award, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { formatPoints } from "@/shared/utils/formatPoints";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function CommunitySection({ ranking }) {
  const navigate = useNavigate();

  return (
    <section id="ranking" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-balance">
                Sé parte de los primeros cinéfilos de{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Cut!
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Jugá, sumá puntos y dejá tu marca en los rankings. Estás
                entrando en una comunidad que recién empieza — cada partida
                cuenta desde el primer día.
              </p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              <Card className="border-border bg-card">
                <CardContent className="p-6 space-y-2">
                  <Users className="w-8 h-8 text-primary" />
                  <div className="text-3xl font-bold">
                    Comunidad en crecimiento
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Los primeros jugadores ya están participando
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardContent className="p-6 space-y-2">
                  <TrendingUp className="w-8 h-8 text-accent" />
                  <div className="text-3xl font-bold">
                    Sistema de puntos activo
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Cada partida impacta en tu posición
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group"
              onClick={() => navigate("/login")}
            >
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
                <span className="text-sm text-muted-foreground">
                  Esta semana
                </span>
              </div>

              <div className="space-y-3">
                {ranking.map((player) => (
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

                    {player && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          key={player.avatar_url}
                          src={player.avatar_url || "/placeholder.svg"}
                          alt={player.username}
                        />
                        <AvatarFallback className="bg-white text-primary-foreground text-md">
                          {player.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className="flex-1">
                      <div className="font-semibold">{player.username}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatPoints(player.points)} puntos
                      </div>
                    </div>

                    {player.rank <= 3 && (
                      <Award
                        className={`w-5 h-5 ${
                          player.rank === 1
                            ? "text-primary"
                            : player.rank === 2
                              ? "text-accent"
                              : "text-chart-3"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                disabled
              >
                Ranking completo · Próximamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
