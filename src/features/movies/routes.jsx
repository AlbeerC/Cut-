import MoviesListPage from "./pages/MoviesListPage"
import MoviesLayout from "./components/MoviesLayout"
import MovieDetailPage from "./pages/MovieDetailPage"
import MoviePersonListPage from "./pages/MoviePersonListPage"
import MoviesSearchListPage from "./pages/MoviesSearchListPage"

export default [
  {
    path: "movies",
    element: <MoviesLayout />,
    children: [
      { index: true, element: <MoviesListPage /> },
      { path: ":id", element: <MovieDetailPage /> },
      { path: "person/:role/:personId/:name", element: <MoviePersonListPage /> },
      { path: "search/:query", element: <MoviesSearchListPage /> },
    ],
  },
]