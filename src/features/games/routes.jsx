import GamesCenterPage from "./pages/GamesCenterPage";
import GamesLayout from "./components/GamesLayout";
import versusRoutes from "./vsBattle/routes"
import timelineRoutes from "./timeline/routes"
import directorRoutes from "./director/routes"
import sixDegreesRoutes from "./sixdegrees/routes"
import movieCluesRoutes from "./movieclues/routes"

export default [
  {
    path: "games",
    element: <GamesLayout />,
    children: [
      { index: true, element: <GamesCenterPage /> },
      ...versusRoutes,
      ...timelineRoutes,
      ...directorRoutes,
      ...sixDegreesRoutes,
      ...movieCluesRoutes
    ],
  },
]