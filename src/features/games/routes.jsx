import GamesCenterPage from "./pages/GamesCenterPage";
import GamesLayout from "./components/GamesLayout";
import StartGamePage from "./vsBattle/pages/StartGamePage";
import VersusBattle from "./vsBattle/components/Battle";

export default [
  {
    path: "games",
    element: <GamesLayout />,
    children: [
      { index: true, element: <GamesCenterPage /> },
      {  path: "versus", element: <StartGamePage /> },
      { path: "versus/play", element: <VersusBattle /> },
    ],
  },
]