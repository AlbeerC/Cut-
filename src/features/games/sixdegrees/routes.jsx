import SixDegreesFinal from "./components/SixDegreesFinal";
import SixDegreesGame from "./components/SixDegreesGame";
import SixDegreesLayout from "./components/SixDegreesLayout";
import SixDegreesResult from "./components/SixDegreesResult";
import StartGamePage from "./pages/StartGamePage";


export default [
  {
    path: "sixdegrees",
    element: <SixDegreesLayout />,
    children: [
      { index: true, element: <StartGamePage /> },
      { path: "play", element: <SixDegreesGame /> },
      { path: "result", element: <SixDegreesResult /> },
      { path: "finish", element: <SixDegreesFinal /> }
    ],
  },
]
