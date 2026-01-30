import { Camera, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "react-responsive";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { getAvatarPublicUrl } from "../api/profile.api";

export function EditProfileInfoModal({
  open,
  onOpenChange,
  currentName = "",
  currentImage,
  onSave,
}) {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [name, setName] = useState(currentName);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Inicializar cuando el modal se abre
  useEffect(() => {
    if (open) {
      setName(currentName);
      setImagePreview(currentImage || null);
      setImageChanged(false);
    }
  }, [open, currentName, currentImage]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño (máximo 500KB)
      if (file.size > 0.5 * 1024 * 1024) {
        toast.error("La imagen es muy grande. Máximo 500KB.");
        return;
      }

      // Validar tipo
      if (!file.type.startsWith("image/")) {
        toast.error("Por favor selecciona una imagen válida.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Base64 data URL
        setImageChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageChanged(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("El nombre no puede estar vacío");
      return;
    }

    setIsLoading(true);
    try {
      await onSave({
        name: name.trim(),
        image: imagePreview,
        imageChanged, // Indicar si la imagen cambió
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Error al guardar el perfil");
    } finally {
      setIsLoading(false);
    }
  };

  // Determinar qué URL mostrar en el avatar
  const getDisplayImageUrl = () => {
    if (!imagePreview) return null;

    // Si es una imagen nueva (base64)
    if (imagePreview.startsWith("data:")) {
      return imagePreview;
    }

    // Si es una ruta de storage existente
    return getAvatarPublicUrl(imagePreview);
  };

  const ProfileForm = ({ className }) => (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Avatar Section */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <Avatar className="size-24 border-2 border-border">
            <AvatarImage src={getDisplayImageUrl()} alt="Avatar preview" />

            <AvatarFallback className="bg-muted text-2xl">
              {name ? (
                name.charAt(0).toUpperCase()
              ) : (
                <User className="size-8 text-muted-foreground" />
              )}
            </AvatarFallback>
          </Avatar>

          {imagePreview && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute -top-1 -right-1 size-6 rounded-full bg-destructive flex items-center justify-center hover:bg-destructive/90 transition-colors shadow-md"
              aria-label="Eliminar imagen"
            >
              <X className="size-3.5 text-white" />
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleImageChange}
          className="hidden"
          id="avatar-upload"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="gap-2"
        >
          <Camera className="size-4" />
          {imagePreview ? "Cambiar imagen" : "Subir imagen"}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          JPG, PNG o WEBP. Máximo 500KB.
        </p>
      </div>

      {/* Name Input */}
      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-base"
          autoComplete="name"
          autoFocus
          maxLength={50}
        />
        {name.length > 40 && (
          <p className="text-xs text-muted-foreground">
            {50 - name.length} caracteres restantes
          </p>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Editar Perfil</DrawerTitle>
            <DrawerDescription>
              Actualiza tu nombre e imagen de perfil
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-2">
            <ProfileForm />
          </div>
          <DrawerFooter>
            <Button onClick={handleSave} disabled={!name.trim() || isLoading}>
              {isLoading ? "Guardando..." : "Guardar cambios"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" className="bg-transparent">
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
          <DialogDescription>
            Actualiza tu nombre e imagen de perfil
          </DialogDescription>
        </DialogHeader>
        <ProfileForm />
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="bg-transparent"
          >
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!name.trim() || isLoading}>
            {isLoading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}