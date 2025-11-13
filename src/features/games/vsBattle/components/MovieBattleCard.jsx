
import { Card } from "@/components/ui/card";
import { Clock, Calendar, Star } from "lucide-react";

export default function MovieBattleCard({ movie }) {

  return (
    <Card
      className="group relative overflow-hidden bg-gradient-to-br from-card to-card/80 border border-border/50 hover:border-primary/60 transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 py-0"
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/40 shadow-lg">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-bold text-white">
            {movie.vote_average.toFixed(1)}
          </span>
        </div>

        {/* Brightness effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/0 to-white/0 group-hover:via-white/10 transition-all duration-700" />
      </div>

      {/* Movie Info */}
      <div className="relative py-2 px-5 space-y-3 bg-gradient-to-b from-card/50 to-card">
        <h3 className="font-bold text-lg text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors duration-300">
          {movie.title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5 group/date hover:text-primary transition-colors">
            <Calendar className="w-3.5 h-3.5" />
            <span className="font-medium">{new Date(movie.release_date).getFullYear()}</span>
          </div>

          {movie.runtime && (
            <div className="flex items-center gap-1.5 group/time hover:text-primary transition-colors">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-medium">{movie.runtime} min</span>
            </div>
          )}
        </div>

        {/* Rating progress bar */}
        <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-500 group-hover:from-primary group-hover:to-yellow-400"
            style={{ width: `${(movie.vote_average / 10) * 100}%` }}
          />
        </div>
      </div>

      {/* Brightness effect on hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_20px_rgba(var(--primary),0.3)]" />
      </div>
    </Card>
  );
}