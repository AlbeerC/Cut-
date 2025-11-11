import { useState } from "react"
import { Calendar, MapPin, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import PersonProfileSkeleton from "./PersonProfileSkeleton"

export default function PersonProfile({ person, loading, error }) {
  const [showFullBio, setShowFullBio] = useState(false)

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Calculate age or lifespan
  const getAge = (birthday, deathday) => {
    if (!birthday) return null
    const birth = new Date(birthday)
    const end = deathday ? new Date(deathday) : new Date()
    const age = end.getFullYear() - birth.getFullYear()
    return age
  }

  // Truncate biography to first 3 sentences
  const getTruncatedBio = (bio) => {
    if (!bio) return ""
    const sentences = bio.match(/[^.!?]+[.!?]+/g) || []
    return sentences.slice(0, 3).join(" ")
  }

  const age = person?.birthday ? getAge(person.birthday, person.deathday) : null
  const truncatedBio = getTruncatedBio(person?.biography)
  const shouldShowButton = person?.biography && person.biography.length > truncatedBio.length

  if (error) return <p>{error}</p>
  if (loading) return <PersonProfileSkeleton />

  return (
    <div className="mx-5 mb-12">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-r from-card via-card/95 to-card rounded-xl overflow-hidden border border-border">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />

        <div className="relative p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Profile Image */}
            {person?.profile_path && (
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
                  <img
                    src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                    alt={person?.name || "Person"}
                    className="relative w-32 h-32 md:w-40 md:h-40 object-cover rounded-xl border-2 border-primary/20 shadow-2xl"
                  />
                </div>
              </div>
            )}

            {/* Info Section */}
            <div className="flex-1 space-y-4">
              {/* Name and Department */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {person?.name || "Nombre no disponible"}
                </h2>
                {person?.known_for_department && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{person.known_for_department}</span>
                  </div>
                )}
              </div>

              {/* Quick Info */}
              {(person?.birthday || person?.place_of_birth) && (
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {person?.birthday && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>
                        {formatDate(person.birthday)}
                        {age && ` (${age} años${person?.deathday ? "" : ""})`}
                      </span>
                    </div>
                  )}

                  {person?.place_of_birth && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{person.place_of_birth}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Biography */}
              {person?.biography && (
                <div className="pt-2">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Biografía</h3>
                  <div className="text-muted-foreground leading-relaxed space-y-2">
                    <p className="text-pretty">{showFullBio ? person.biography : truncatedBio}</p>
                    {shouldShowButton && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFullBio(!showFullBio)}
                        className="text-primary hover:text-primary/80 hover:bg-primary/10 px-0"
                      >
                        {showFullBio ? "Ver menos" : "Ver más"}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom gradient accent */}
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      </div>
    </div>
  )
}
