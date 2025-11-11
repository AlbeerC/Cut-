import { useState } from "react"
import { Star, User, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function MovieReviewsModal({ reviews, isOpen, onClose, loading, error }) {
  const [expandedReviews, setExpandedReviews] = useState({})

  const toggleExpanded = (reviewId) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
  }

  const truncateText = (text, maxLength = 300) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "..."
  }

  if (loading) return <div className="w-full h-full flex items-center justify-center">Loading...</div>
  if (error) return <div className="w-full h-full flex items-center justify-center">Error</div>

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">Reseñas de Usuarios</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {reviews && reviews.length > 0
              ? `${reviews.length} ${reviews.length === 1 ? "reseña" : "reseñas"} de la comunidad`
              : "No hay reseñas disponibles"}
          </DialogDescription>
        </DialogHeader>

        {/* Reviews List */}
        {!reviews || reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No hay reseñas disponibles para esta película.</p>
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            {reviews.map((review) => {
              const isExpanded = expandedReviews[review.id]
              const shouldTruncate = review.content.length > 300
              const displayContent = isExpanded || !shouldTruncate ? review.content : truncateText(review.content)

              return (
                <Card
                  key={review.id}
                  className="bg-card/50 backdrop-blur-sm border-border/50 p-6 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {review.author_details?.avatar_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`}
                          alt={review.author}
                          className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-primary/20"
                        />
                      ) : (
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-muted border-2 border-primary/20 flex items-center justify-center">
                          <User className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{review.author}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(review.created_at)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Rating */}
                        {review.author_details?.rating && (
                          <div className="flex items-center gap-1 bg-primary/10 px-3 py-1 rounded-full border border-primary/20 self-start sm:self-auto">
                            <Star className="w-4 h-4 fill-primary text-primary" />
                            <span className="font-semibold text-primary">{review.author_details.rating}/10</span>
                          </div>
                        )}
                      </div>

                      {/* Review Content */}
                      <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap break-words">
                        {displayContent}
                      </div>

                      {/* Read More Button */}
                      {shouldTruncate && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpanded(review.id)}
                          className="mt-3 text-primary hover:text-primary hover:bg-primary/10"
                        >
                          {isExpanded ? "Ver menos" : "Leer más"}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
