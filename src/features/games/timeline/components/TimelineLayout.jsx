import { Outlet } from "react-router-dom"
import TimelineProvider from "../context/TimelineContext"

export default function TimelineLayout() {
  return (
    <TimelineProvider>
      <Outlet />
    </TimelineProvider>
  )
}