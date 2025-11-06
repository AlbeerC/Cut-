import {
  Star,
  Calendar,
  Clock,
  Globe,
  DollarSign,
  Play,
  Building2,
} from "lucide-react";

export default function MovieDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Backdrop Header Skeleton */}
      <div className="relative h-[75vh] overflow-hidden">
        {/* Fondo animado */}
        <div className="w-full h-full bg-gradient-to-br from-zinc-800/20 via-zinc-800/10 to-zinc-800/20 animate-pulse" />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/40 to-background/80" />

        {/* Content Over Backdrop */}
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <div className="flex flex-col md:flex-row gap-8 items-end">
              {/* Poster Skeleton */}
              <div className="flex-shrink-0 relative">
                <div className="overflow-hidden border-2 border-zinc-700/50 shadow-2xl w-64 aspect-[2/3] bg-zinc-800/20 animate-pulse rounded-lg">
                  <div className="w-full h-full bg-gradient-to-br from-zinc-700/30 via-zinc-700/20 to-zinc-700/30" />
                </div>
              </div>

              {/* Title and Quick Info Skeleton */}
              <div className="flex-1 space-y-5 pb-4">
                <div className="space-y-3">
                  {/* Title */}
                  <div className="h-14 md:h-16 bg-zinc-700/30 rounded-lg w-3/4 animate-pulse" />
                  {/* Tagline */}
                  <div className="h-7 bg-zinc-700/20 rounded-lg w-1/2 animate-pulse" />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Rating Badge */}
                  <div className="flex items-center gap-2.5 bg-purple-500/10 backdrop-blur-md px-5 py-2.5 rounded-xl border border-purple-500/20">
                    <Star className="w-5 h-5 text-purple-500/30" />
                    <div className="h-6 w-12 bg-zinc-700/30 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-zinc-700/20 rounded animate-pulse" />
                  </div>

                  {/* Date Badge */}
                  <div className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-md px-4 py-2.5 rounded-xl border border-zinc-700/30">
                    <Calendar className="w-4 h-4 text-zinc-500/30" />
                    <div className="h-4 w-32 bg-zinc-700/30 rounded animate-pulse" />
                  </div>

                  {/* Runtime Badge */}
                  <div className="flex items-center gap-2 bg-zinc-900/50 backdrop-blur-md px-4 py-2.5 rounded-xl border border-zinc-700/30">
                    <Clock className="w-4 h-4 text-zinc-500/30" />
                    <div className="h-4 w-16 bg-zinc-700/30 rounded animate-pulse" />
                  </div>
                </div>

                {/* Button Skeleton */}
                <button
                  disabled
                  className="bg-purple-500/20 text-white/30 px-6 py-3 rounded-lg font-semibold gap-2 cursor-not-allowed inline-flex items-center"
                >
                  <Play className="w-5 h-5" />
                  Ver Trailer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Genres Skeleton */}
        <div className="flex flex-wrap gap-2.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-9 w-24 bg-zinc-800/20 rounded-md animate-pulse"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>

        {/* Overview Skeleton */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-32 bg-zinc-700/30 rounded-lg animate-pulse" />
            <div className="h-1 flex-1 max-w-20 bg-zinc-800/20 rounded-full" />
          </div>
          <div className="space-y-3 max-w-4xl">
            <div className="h-5 bg-zinc-800/20 rounded w-full animate-pulse" />
            <div className="h-5 bg-zinc-800/20 rounded w-full animate-pulse" />
            <div className="h-5 bg-zinc-800/20 rounded w-5/6 animate-pulse" />
            <div className="h-5 bg-zinc-800/20 rounded w-4/6 animate-pulse" />
          </div>
        </div>

        {/* Grid Layout Skeleton */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Production Details Skeleton */}
          <div className="p-6 bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800/50 rounded-lg space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="w-6 h-6 text-purple-500/30" />
              <div className="h-7 w-56 bg-zinc-700/30 rounded-lg animate-pulse" />
            </div>

            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-zinc-800/10 rounded-lg">
                      <div className="w-5 h-5 bg-zinc-700/30 rounded animate-pulse" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 w-28 bg-zinc-700/30 rounded animate-pulse" />
                      <div className="h-6 w-36 bg-zinc-700/20 rounded animate-pulse" />
                    </div>
                  </div>
                  {i < 3 && <div className="h-px bg-zinc-800/50 mt-5" />}
                </div>
              ))}
            </div>
          </div>

          {/* Production Companies Skeleton */}
          <div className="p-6 bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-zinc-800/50 rounded-lg space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-purple-500/30" />
              <div className="h-7 w-40 bg-zinc-700/30 rounded-lg animate-pulse" />
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/30"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="w-12 h-12 flex-shrink-0 bg-zinc-800/20 rounded-lg animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-40 bg-zinc-700/30 rounded animate-pulse" />
                    <div className="h-4 w-12 bg-zinc-700/20 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}