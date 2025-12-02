import SixDegreesGameMVP from "./components/SixDegreesGameMVP";
import SixDegreesLayout from "./components/SixDegreesLayout";
import StartGamePage from "./pages/StartGamePage";
import SixDegreesResult from "./components/SixDegreesResult";


export default [
  {
    path: "sixdegrees",
    element: <SixDegreesLayout />,
    children: [
      { index: true, element: <StartGamePage /> },
      { path: "play", element: <SixDegreesGameMVP /> },
      { path: "result", element: <SixDegreesResult /> },
    ],
  },
]
