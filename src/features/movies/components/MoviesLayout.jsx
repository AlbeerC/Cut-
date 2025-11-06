import { Outlet } from "react-router-dom"

export default function MoviesLayout() {
  return (
    <div className="p-4">
      <Outlet />
    </div>
  )
}