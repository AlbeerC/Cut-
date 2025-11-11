import {
  Star,
  Calendar,
  Clock,
  Globe,
  DollarSign,
  Play,
  Building2,
  Award,
  Users,
  Film,
  Eye
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatRuntime } from "../utils/formatRuntime";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import MovieReviews from "./MovieReviews";
import MovieCard from "./MovieCard";

export default function MovieDetail({ movie, reviews, reviewsLoading, reviewsError, recommendations }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [openReviews, setOpenReviews] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [movie])

  // Filter directors
  const directors =
    movie.credits?.crew?.filter((person) => person.job === "Director") || [];

  // Get first 8 actors from cast
  const cast = movie.credits?.cast?.slice(0, 12) || [];

  // Get videos from YouTube (prioritizing trailers)
  const videos =
    movie.videos?.results?.filter((video) => video.site === "YouTube") || [];

  // Sort videos: trailers first, then the rest
  const sortedVideos = [...videos]
    .sort((a, b) => {
      const aIsTrailer =
        a.type === "Trailer" || a.name.toLowerCase().includes("trailer");
      const bIsTrailer =
        b.type === "Trailer" || b.name.toLowerCase().includes("trailer");
      if (aIsTrailer && !bIsTrailer) return -1;
      if (!aIsTrailer && bIsTrailer) return 1;
      return 0;
    })
    .slice(0, 6);

  const mainTrailer = sortedVideos.find(
    (video) =>
      video.type === "Trailer" || video.name.toLowerCase().includes("trailer")
  );


  return (
    <div className="min-h-screen bg-background pt-20">
      {/* HEADER */}
      {isMobile ? (
        // 🔹 MOBILE VERSION
        <div className="relative bg-background pt-8 pb-2">
          <div className="flex flex-col gap-4 px-4">
            {/* Poster + Info */}
            <div className="flex items-start gap-4">
              {/* Poster */}
              <div className="w-28 flex-shrink-0 rounded-lg overflow-hidden border border-border/50">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 space-y-1">
                <h1 className="text-2xl font-bold leading-tight text-foreground">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-sm italic text-accent/80">
                    “{movie.tagline}”
                  </p>
                )}

                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-md">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="flex items-center gap-1 bg-card/50 px-2 py-1 rounded-md">
                    <Calendar className="w-3 h-3 text-accent" />
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                  <span className="flex items-center gap-1 bg-card/50 px-2 py-1 rounded-md">
                    <Clock className="w-3 h-3 text-accent" />
                    {formatRuntime(movie.runtime)}
                  </span>
                </div>
              </div>
            </div>

            {/* Backdrop Preview */}
            <div className="relative w-full h-48 rounded-lg overflow-hidden mt-2">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              {mainTrailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${mainTrailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-primary-foreground fill-current ml-1" />
                  </div>
                </a>
              )}
            </div>
            {/* Open review button */}
            <Button
              size="md"
              className="bg-primary/90 px-4 py-2 text-primary-foreground shadow-lg hover:bg-primary/80 transition-all max-w-md"
              onClick={() => setOpenReviews(true)}
            >
              <Eye className="w-5 h-5" />
              Ver reviews
            </Button>
          </div>
        </div>
      ) : (
        // 💻 DESKTOP VERSION
        <div className="relative h-[75vh] overflow-hidden max-md:h-[90vh]">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/40 to-background/80" />
          <div className="absolute inset-0 flex items-end max-md:items-center">
            <div className="container mx-auto px-4 pb-4">
              <div className="flex flex-col md:flex-row gap-8 items-end">
                {/* Poster */}
                <div className="flex-shrink-0 relative group">
                  <Card className="overflow-hidden border-2 border-primary/40 shadow-2xl shadow-primary/25 w-64 transition-all duration-500 group-hover:border-primary/60 group-hover:shadow-primary/35">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    />
                  </Card>
                  <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
                </div>

                {/* Title and Quick Info */}
                <div className="flex-1 space-y-5 pb-4">
                  <div className="space-y-3">
                    <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-2 text-balance drop-shadow-lg max-md:text-3xl">
                      {movie.title}
                    </h1>
                    {movie.tagline && (
                      <p className="text-xl text-accent italic font-light max-md:text-lg">
                        "{movie.tagline}"
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-foreground">
                    <div className="flex items-center gap-2.5 bg-primary/20 backdrop-blur-md px-5 py-2.5 rounded-xl border border-primary/50 shadow-lg hover:bg-primary/25 transition-colors">
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      <span className="text-xl font-bold">
                        {movie.vote_average.toFixed(1)}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({movie.vote_count.toLocaleString()} votos)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 bg-card/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-border/50 hover:border-primary/30 transition-colors">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span className="text-sm">
                        {new Date(movie.release_date).toLocaleDateString(
                          "es-ES",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 bg-card/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-border/50 hover:border-primary/30 transition-colors">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-sm">
                        {formatRuntime(movie.runtime)}
                      </span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105"
                    asChild={mainTrailer}
                    disabled={!mainTrailer}
                  >
                    {mainTrailer ? (
                      <a
                        href={`https://www.youtube.com/watch?v=${mainTrailer.key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Play className="w-5 h-5 fill-current" />
                        Ver Trailer
                      </a>
                    ) : (
                      <>
                        <Play className="w-5 h-5 fill-current" />
                        Sin Trailer Disponible
                      </>
                    )}
                  </Button>
                  <Button onClick={() => setOpenReviews(true)} size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all hover:scale-105 ml-4 cursor-pointer">
                    <Eye className="w-5 h-5" />
                    Ver reviews
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Genres */}
        <div className="flex flex-wrap gap-2.5">
          {movie.genres?.map((genre) => (
            <Badge
              key={genre.id}
              variant="outline"
              className="px-4 py-2 text-sm border-primary/40 bg-primary/10 text-foreground hover:bg-primary/20 hover:border-primary/60 transition-all cursor-default"
            >
              {genre.name}
            </Badge>
          ))}
        </div>

        {/* Overview */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
            Sinopsis
            <div className="h-1 flex-1 max-w-20 bg-gradient-to-r from-primary to-transparent rounded-full" />
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
            {movie.overview}
          </p>
        </div>

        {/* Director */}
        {directors.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Award className="w-7 h-7 text-primary" />
              {directors.length > 1 ? "Directores" : "Director"}
            </h2>

            <div className="flex flex-wrap gap-6">
              {directors.map((director) => (
                <Card
                  key={director.credit_id}
                  className="w-40 md:w-48 p-4 bg-gradient-to-br from-card to-card/60 border border-border/50 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group flex flex-col items-center justify-center text-center"
                  onClick={() =>
                    navigate(
                      `/movies/person/director/${
                        director.id
                      }/${encodeURIComponent(director.name)}`
                    )
                  }
                >
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-300">
                    {director.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/original${director.profile_path}`}
                        alt={director.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10">
                        <Award className="w-10 h-10 text-primary/50" />
                      </div>
                    )}
                  </div>

                  <div className="mt-3 space-y-1">
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {director.name}
                    </p>
                    <p className="text-sm text-muted-foreground">Director</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Users className="w-7 h-7 text-primary" />
              Reparto Principal
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {cast.map((actor) => (
                <Card
                  key={actor.cast_id}
                  className="overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/40 transition-all group cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/movies/person/actor/${actor.id}/${encodeURIComponent(
                        actor.name
                      )}`
                    )
                  }
                >
                  {/* Actor Photo */}
                  <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden bg-muted/10">
                    {actor.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                        alt={actor.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-muted/20">
                        <Users className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    )}
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
                  </div>

                  {/* Actor Info */}
                  <div className="p-3 space-y-1">
                    <p className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">
                      {actor.name}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {actor.character}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Videos & Trailers */}
        {sortedVideos.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Film className="w-7 h-7 text-primary" />
              Videos y Trailers
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedVideos.map((video) => (
                <a
                  key={video.id}
                  href={`https://www.youtube.com/watch?v=${video.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="overflow-hidden bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/40 transition-all">
                    {/* Video Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-muted/10">
                      <img
                        src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                        alt={video.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/90 group-hover:bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 text-primary-foreground fill-current ml-1" />
                        </div>
                      </div>

                      {/* Type Badge */}
                      {video.type && (
                        <div className="absolute top-2 left-2 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-md border border-primary/30">
                          <span className="text-xs font-semibold text-foreground">
                            {video.type}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Video Info */}
                    <div className="p-3">
                      <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors line-clamp-2">
                        {video.name}
                      </p>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Grid Layout for Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Production Details */}
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/30 transition-all space-y-6">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6 text-primary" />
              Información Financiera
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4 group">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-foreground mb-1">
                    Presupuesto
                  </h4>
                  <p className="text-lg text-muted-foreground font-medium">
                    ${movie.budget.toLocaleString("es-ES")}
                  </p>
                </div>
              </div>

              <div className="h-px bg-border/50" />

              <div className="flex items-start gap-4 group">
                <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <DollarSign className="w-5 h-5 text-accent" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-foreground mb-1">
                    Recaudación
                  </h4>
                  <p className="text-lg text-muted-foreground font-medium">
                    ${movie.revenue.toLocaleString("es-ES")}
                  </p>
                </div>
              </div>

              <div className="h-px bg-border/50" />

              <div className="flex items-start gap-4 group">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-semibold text-foreground mb-1">
                    Idioma Original
                  </h4>
                  <p className="text-lg text-muted-foreground font-medium uppercase">
                    {movie.original_language}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Production Companies */}
          <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border/50 hover:border-primary/30 transition-all space-y-6">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-primary" />
              Productoras
            </h3>

            <div className="space-y-4">
              {movie.production_companies?.map((company) => (
                <div
                  key={company.id}
                  className="flex items-center gap-4 p-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/40 hover:bg-card/80 transition-all group"
                >
                  {company.logo_path ? (
                    <div className="w-12 h-12 flex-shrink-0 bg-white/90 rounded-lg p-2 flex items-center justify-center">
                      <img
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary/50" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {company.name}
                    </p>
                    {company.origin_country && (
                      <p className="text-sm text-muted-foreground">
                        {company.origin_country}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground flex items-center gap-3 mb-4">
            <Star className="w-6 h-6 text-primary" />
            Recomendaciones
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recommendations?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      { openReviews && (
        <MovieReviews 
          reviews={reviews?.results} 
          isOpen={openReviews}
          onClose={() => setOpenReviews(false)}
          loading={reviewsLoading}
          error={reviewsError}
        />
      )}
    </div>
  );
}
