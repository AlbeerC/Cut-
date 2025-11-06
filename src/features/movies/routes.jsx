import MoviesListPage from "./pages/MoviesListPage"
import MoviesLayout from "./components/MoviesLayout"
import MovieDetailPage from "./pages/MovieDetailPage"

export default [
  {
    path: "movies",
    element: <MoviesLayout />,
    children: [
      { index: true, element: <MoviesListPage /> },
      { path: ":id", element: <MovieDetailPage /> },
    ],
  },
]