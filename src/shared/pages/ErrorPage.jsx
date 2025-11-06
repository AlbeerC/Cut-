import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Oops!</h1>
      <p>Something went wrong.</p>
      {import.meta.env.DEV && (
        <pre className="mt-4 text-sm text-red-400">{error?.message}</pre>
      )}
    </div>
  )
}
