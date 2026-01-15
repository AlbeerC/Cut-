import { LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "../context/AuthContext"

export function ProfileButton({ onClick }) {

    const { profile } = useAuth()

  if (profile) {
    return (
      <Button
        variant="outline"
        size="lg"
        onClick={onClick}
        className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-all duration-200"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={profile.avatar_url || "/placeholder.svg"} alt={profile.username} />
          <AvatarFallback className="bg-primary text-primary-foreground text-md">
            {profile.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="hidden sm:inline font-medium">{profile.username}</span>
      </Button>
    )
  }

  return (
    <Button
      variant="default"
      size="sm"
      onClick={onClick}
      className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 transition-all duration-200"
    >
      <LogIn className="h-4 w-4" />
      <span className="font-medium">Login</span>
    </Button>
  )
}
