import { Trophy, Gamepad2, Clock, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="container max-w-4xl mx-auto pt-30 pb-10 px-4">
      {/* Header Skeleton */}
      <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-6 flex items-center gap-6 shadow-lg">
        {/* Avatar Skeleton */}
        <Skeleton className="h-24 w-24 rounded-full" />

        <div className="flex flex-col gap-2 flex-1">
          {/* Username Skeleton */}
          <Skeleton className="h-8 w-48 max-md:w-32" />
          {/* Member since Skeleton */}
          <Skeleton className="h-4 w-56 max-md:w-40" />
          {/* Points Skeleton */}
          <div className="flex items-center gap-2 mt-2">
            <Trophy className="w-5 h-5 text-muted-foreground/50" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-4 flex flex-col items-center shadow"
          >
            <div className="w-7 h-7 mb-2 text-muted-foreground/50">
              {i === 1 && <Gamepad2 />}
              {i === 2 && <Star />}
              {i === 3 && <Clock />}
            </div>
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-7 w-16" />
          </div>
        ))}
      </div>

      {/* Badges Skeleton */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Logros</h2>
        <div className="flex gap-3 flex-wrap">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-9 w-32 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Recent Games Skeleton */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Historial reciente</h2>

        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-4 flex justify-between items-center shadow"
            >
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>

              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}