import MoviesListPage from "./pages/MoviesListPage"
import MoviesLayout from "./components/MoviesLayout"

export default [
  {
    path: "movies",
    element: <MoviesLayout />,
    children: [
      { index: true, element: <MoviesListPage /> },
      // { path: ":id", element: <MovieDetailPage /> },
    ],
  },
]