import VersusLayout from "./components/VersusLayout"
import StartGamePage from "./pages/StartGamePage"
import VersusBattle from "./components/Battle"

export default [
  {
    path: "versus",
    element: <VersusLayout />,
    children: [
      { index: true, element: <StartGamePage /> },
      { path: "play", element: <VersusBattle /> },
    ],
  },
]
