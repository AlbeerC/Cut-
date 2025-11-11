export default function PersonProfileSkeleton() {
  return (
    <div className="w-full mb-12 animate-pulse">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-r from-card via-card/95 to-card rounded-xl overflow-hidden border border-border">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

        <div className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Profile Image Skeleton */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-muted rounded-xl" />
            </div>

            {/* Info Section Skeleton */}
            <div className="flex-1 space-y-4">
              {/* Name and Department */}
              <div>
                <div className="h-8 md:h-10 bg-muted rounded-lg w-64 mb-2" />
                <div className="h-6 bg-muted rounded-full w-32" />
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4">
                <div className="h-5 bg-muted rounded w-40" />
                <div className="h-5 bg-muted rounded w-48" />
              </div>

              {/* Biography */}
              <div className="pt-2">
                <div className="h-6 bg-muted rounded w-24 mb-2" />
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
                <div className="h-8 bg-muted rounded w-20 mt-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient accent */}
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-50" />
      </div>
    </div>
  )
}
