import { createBrowserRouter } from "react-router-dom"
import Layout from "../shared/components/Layout"
import ErrorPage from "../shared/pages/ErrorPage"
import landingRoutes from "../features/landing/routes"
import moviesRoutes from "../features/movies/routes"
import gamesRoutes from "../features/games/routes"
import authRoutes from "../features/auth/routes"
import extraRoutes from "../shared/pages/routes"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      ...landingRoutes,
      ...moviesRoutes,
      ...gamesRoutes,
      ...authRoutes,
      ...extraRoutes
    ],
  },
])
