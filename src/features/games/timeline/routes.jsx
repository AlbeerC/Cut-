import TimelineConfig from "./components/TimelineConfig";
import TimelineRound from "./components/TimelineRound";
import TimelineLayout from "./components/TimelineLayout";

export default [
  {
    path: "versus",
    element: <TimelineLayout />,
    children: [
      { index: true, element: <TimelineConfig /> },
      { path: "play", element: <TimelineRound /> },
    ],
  },
]
