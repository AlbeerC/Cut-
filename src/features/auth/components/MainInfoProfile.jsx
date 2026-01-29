import { Trophy, Gamepad2, Clock, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPoints } from "@/shared/utils/formatPoints";

export default function MainInfoProfile( {profile, profileStats, stats, recentGames, achievements} ) {

  const getDate = (date) => {
    const d = new Date(date);

    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container max-w-4xl mx-auto pt-30 pb-10 px-4">
      {/* Header */}
      <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-6 flex items-center gap-6 shadow-lg">
        <Avatar className="h-24 w-24">
          <AvatarImage src={profile.avatar_url || "/placeholder.svg"} alt={profile.username} />
          <AvatarFallback className="bg-primary text-primary-foreground text-md">
            {profile.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold max-md:text-xl">{profile.username}</h1>
          <p className="text-muted-foreground max-md:text-md">Miembro desde el {getDate(profile.created_at)}</p>
          <div className="flex items-center gap-2 mt-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold">{formatPoints(profileStats.points)} puntos</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-4 flex flex-col items-center shadow">
          <Gamepad2 className="w-7 h-7 mb-2 text-primary" />
          <p className="text-xs text-muted-foreground">Partidas jugadas</p>
          <p className="text-2xl font-bold">{stats.games_completed}</p>
        </div>

        <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-4 flex flex-col items-center shadow">
          <Star className="w-7 h-7 mb-2 text-primary" />
          <p className="text-xs text-muted-foreground">Mejor puntaje</p>
          <p className="text-2xl font-bold">{stats.best_score}</p>
        </div>

        <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-4 flex flex-col items-center shadow">
          <Clock className="w-7 h-7 mb-2 text-primary" />
          <p className="text-xs text-muted-foreground">Horas jugadas</p>
          <p className="text-2xl font-bold">{stats.hours_played} h</p>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Logros</h2>
        <div className="flex gap-3 flex-wrap">
          {achievements.map((achi, i) => (
            <span
              key={achi.id}
              className="px-4 py-2 bg-primary/10 text-primary rounded-xl border border-primary/20 text-sm font-medium"
            >
              {achi.icon} {" "}
              {achi.title}
            </span>
          ))}
        </div>

        {achievements.length === 0 && (
          <p className="text-neutral-400 text-sm">
            Todavía no has logrado ningún logro
          </p>
        )}
      </div>

      {/* Recent Games */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Historial reciente</h2>

        <div className="space-y-3">
          {recentGames.map((g) => (
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
  );
}
