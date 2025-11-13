import { createBrowserRouter } from "react-router-dom"
import Layout from "../shared/components/Layout"
import ErrorPage from "../shared/pages/ErrorPage"
import landingRoutes from "../features/landing/routes"
import moviesRoutes from "../features/movies/routes"
import gamesRoutes from "../features/games/routes"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      ...landingRoutes,
      ...moviesRoutes,
      ...gamesRoutes,
    ],
  },
])
