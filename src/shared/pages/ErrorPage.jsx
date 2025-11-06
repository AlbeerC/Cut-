
export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <h1 className="text-6xl font-bold">Ups! Ocurrió un error.</h1>
      <p className="mt-6 text-center text-lg text-muted-foreground">
        Intenta volver a la página anterior.
      </p>
    </div>
  )
}