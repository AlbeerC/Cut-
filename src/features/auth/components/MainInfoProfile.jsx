import { Trophy, Gamepad2, Clock, Star, Settings } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatPoints } from "@/shared/utils/formatPoints";
import { EditProfileInfoModal } from "./EditProfileInfoModal";
import {
  updateProfile,
  uploadAvatar,
  deleteAvatar,
  getAvatarPublicUrl,
} from "../api/profile.api";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function MainInfoProfile({
  profile,
  profileStats,
  stats,
  recentGames,
  achievements,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { updateProfileInfo } = useAuth();

  const getDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSaveProfile = async (data) => {
    try {
      const oldAvatarPath = profile.avatar_url;
      let newAvatarPath = oldAvatarPath;

      // Solo procesar cambios de imagen si imageChanged es true
      if (data.imageChanged) {
        // CASO 1: Usuario subió una nueva imagen (data.image es base64)
        if (data.image && data.image.startsWith("data:")) {
          // Subir nueva imagen
          newAvatarPath = await uploadAvatar(data.image);

          // Eliminar imagen anterior si existía
          if (oldAvatarPath) {
            await deleteAvatar(oldAvatarPath);
          }
        }
        // CASO 2: Usuario eliminó la imagen (data.image es null)
        else if (!data.image) {
          // Eliminar imagen anterior si existía
          if (oldAvatarPath) {
            await deleteAvatar(oldAvatarPath);
          }
          newAvatarPath = null;
        }
        // CASO 3: data.image tiene la misma ruta que antes (no cambió)
        // No hacer nada, mantener newAvatarPath = oldAvatarPath
      }

      // Actualizar perfil en la base de datos
      const { error } = await updateProfile({
        userId: profile.id,
        username: data.name,
        avatarUrl: newAvatarPath,
      });

      if (error) throw error;

      // Actualizar contexto de autenticación
      updateProfileInfo({
        username: data.name,
        avatar_url: newAvatarPath,
      });

      toast.success("Perfil actualizado correctamente");
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      toast.error("Error al actualizar el perfil. Por favor intenta de nuevo.");
    }
  };

  return (
    <>
      <div className="container max-w-4xl mx-auto pt-30 pb-10 px-4">
        {/* Header */}
        <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-6 shadow-lg relative">
          {/* Edit Button - Floating top-right */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-4 right-4 h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-all"
            aria-label="Editar perfil"
          >
            <Settings className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-6 pr-12">
            <Avatar className="h-24 w-24 ring-2 ring-primary/20">
              <AvatarImage
                src={getAvatarPublicUrl(profile.avatar_url)}
                alt={`Avatar de ${profile.username}`}
              />

              <AvatarFallback className="bg-primary text-primary-foreground text-md">
                {profile.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold max-md:text-xl">
                {profile.username}
              </h1>
              <p className="text-muted-foreground max-md:text-md">
                Miembro desde el {getDate(profile.created_at)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">
                  {formatPoints(profileStats.points)} puntos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-4 flex flex-col items-center shadow">
            <Gamepad2 className="w-7 h-7 mb-2 text-primary" />
            <p className="text-xs text-muted-foreground">Partidas jugadas</p>
            <p className="text-2xl font-bold">{stats?.games_completed}</p>
          </div>

          <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-4 flex flex-col items-center shadow">
            <Star className="w-7 h-7 mb-2 text-primary" />
            <p className="text-xs text-muted-foreground">Mejor puntaje</p>
            <p className="text-2xl font-bold">{stats?.best_score}</p>
          </div>

          <div className="bg-background/70 backdrop-blur-lg border border-border/40 rounded-2xl p-4 flex flex-col items-center shadow">
            <Clock className="w-7 h-7 mb-2 text-primary" />
            <p className="text-xs text-muted-foreground">Horas jugadas</p>
            <p className="text-2xl font-bold">{stats?.hours_played} h</p>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Logros</h2>
          <div className="flex gap-3 flex-wrap">
            {achievements.map((achi) => (
              <span
                key={achi.id}
                className="px-4 py-2 bg-primary/10 text-primary rounded-xl border border-primary/20 text-sm font-medium"
              >
                {achi.icon} {achi.title}
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
                  <span className="text-muted-foreground text-sm">
                    {g.date}
                  </span>
                </div>

                <span className="text-lg font-semibold">{g.score} pts</span>
              </div>
            ))}
          </div>

          {recentGames.length === 0 && (
            <p className="text-neutral-400 text-sm">
              No hay partidas recientes
            </p>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileInfoModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        currentName={profile.username}
        currentImage={profile.avatar_url}
        onSave={handleSaveProfile}
      />
    </>
  );
}