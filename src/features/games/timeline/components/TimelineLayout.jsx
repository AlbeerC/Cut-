import { Outlet } from "react-router-dom"
import { ConfigProvider } from "../context/ConfigTimelineContext"

export default function TimelineLayout() {
  return (
    <ConfigProvider>
      <Outlet />
    </ConfigProvider>
  )
}