export default function ProfileNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4">
      <h1 className="text-2xl font-bold">Usuario no encontrado</h1>
      <p className="text-muted-foreground">
        El perfil que estás buscando no existe o fue eliminado
      </p>
    </div>
  );
}
