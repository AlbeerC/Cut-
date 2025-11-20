import TimelineFinal from "./components/TimelineFinal";
import TimelineLayout from "./components/TimelineLayout";
import TimelineResult from "./components/TimelineResult";
import TimelineRound from "./components/TimelineRound";
import StartTimelinePage from "./pages/StartTimelinePage";

export default [
  {
    path: "timeline",
    element: <TimelineLayout />,
    children: [
      { index: true, element: <StartTimelinePage /> },
      { path: "play", element: <TimelineRound /> },
      { path: "result", element: <TimelineResult /> },
      { path: "finish", element: <TimelineFinal /> }
    ],
  },
]
