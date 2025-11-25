import { Outlet } from "react-router-dom"
import { SixDegreesProvider } from "../context/SixDegreesContext"

export default function SixDegreesLayout() {

  return (
    <SixDegreesProvider>
      <Outlet />
    </SixDegreesProvider>
  )
}