import MoviesPage from "./pages/MoviesPage"
import MovieDetailPage from "./pages/MovieDetailPage"

export default [
  {
    path: "movies",
    children: [
      { index: true, element: <MoviesPage /> },        // /movies
      { path: ":id", element: <MovieDetailPage /> },   // /movies/:id
    ],
  },
]
