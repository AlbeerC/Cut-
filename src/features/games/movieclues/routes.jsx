import MovieCluesFinal from "./components/movieCluesFinal";
import MovieCluesLayout from "./components/movieCluesLayout";
import StartMovieCluesPage from "./pages/movieCluesStart";
import MovieCluesRound from "./components/movieCluesRound";

export default [
  {
    path: "movieclues",
    element: <MovieCluesLayout />,
    children: [
      { index: true, element: <StartMovieCluesPage /> },
      { path: "play", element: <MovieCluesRound /> },
      { path: "finish", element: <MovieCluesFinal /> },
    ],
  },
];