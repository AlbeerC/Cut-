import DirectorLayout from "./components/DirectorLayout";
import StartDirectorPage from "./pages/StartDirectorPage";
import DirectorRound from "./components/DirectorRound";
import DirectorFinal from "./components/DirectorFinal";

export default [
  {
    path: "director",
    element: <DirectorLayout />,
    children: [
      { index: true, element: <StartDirectorPage /> },
      { path: "play", element: <DirectorRound /> },
      { path: "finish", element: <DirectorFinal /> }
    ],
  },
]
