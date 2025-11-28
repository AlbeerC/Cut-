import { Trophy, Gamepad2, Clock, Star } from "lucide-react"

export default function MainInfoProfile() {
  // MOCK DATA (visual only)
  const user = {
    username: "cinefan22",
    avatar_url: "https://i.pravatar.cc/150?img=14",
    points: 1480,
    totalGames: 86,
    bestScore: 970,
    hoursPlayed: 42,
    badges: ["Experto", "Cinépata", "Top 5 Semanal"],
    recentGames: [
      { id: 1, game: "Versus", score: 320, date: "Hace 2 días" },
      { id: 2, game: "Timeline", score: 480, date: "Hace 4 días" },
      { id: 3, game: "Versus", score: 270, date: "Hace 1 semana" },
    ],
  }

  return (
    <div className="container max-w-4xl mx-auto pt-30 pb-10 px-4">
      {/* Header */}
      <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-6 flex items-center gap-6 shadow-lg">
        <img
          src={user.avatar_url}
          alt="Avatar"
          className="w-24 h-24 rounded-2xl object-cover border border-border"
        />

        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">{user.username}</h1>
          <p className="text-muted-foreground">Miembro desde 2024</p>
          <div className="flex items-center gap-2 mt-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold">{user.points} puntos</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-4 flex flex-col items-center shadow">
          <Gamepad2 className="w-7 h-7 mb-2 text-primary" />
          <p className="text-xs text-muted-foreground">Partidas jugadas</p>
          <p className="text-2xl font-bold">{user.totalGames}</p>
        </div>

        <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-4 flex flex-col items-center shadow">
          <Star className="w-7 h-7 mb-2 text-primary" />
          <p className="text-xs text-muted-foreground">Mejor puntaje</p>
          <p className="text-2xl font-bold">{user.bestScore}</p>
        </div>

        <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-4 flex flex-col items-center shadow">
          <Clock className="w-7 h-7 mb-2 text-primary" />
          <p className="text-xs text-muted-foreground">Horas jugadas</p>
          <p className="text-2xl font-bold">{user.hoursPlayed} h</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Logros</h2>
        <div className="flex gap-3 flex-wrap">
          {user.badges.map((b, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-primary/10 text-primary rounded-xl border border-primary/20 text-sm font-medium"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Games */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Historial reciente</h2>

        <div className="space-y-3">
          {user.recentGames.map((g) => (
            <div
              key={g.id}
              className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-4 flex justify-between items-center shadow"
            >
              <div className="flex flex-col">
                <span className="font-medium">{g.game}</span>
                <span className="text-muted-foreground text-sm">{g.date}</span>
              </div>

              <span className="text-lg font-semibold">{g.score} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
