import { Outlet } from "react-router-dom"
import { ConfigProvider } from "../context/ConfigContext"

export default function VersusLayout() {
  return (
    <ConfigProvider>
      <Outlet />
    </ConfigProvider>
  )
}