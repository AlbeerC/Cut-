import { Outlet } from "react-router"
import MovieCluesProvider from "../context/MovieCluesContext"

export default function MovieCluesLayout() {
  return (
    <MovieCluesProvider>
      <Outlet />
    </MovieCluesProvider>
  )
}
