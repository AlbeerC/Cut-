import { Outlet } from "react-router-dom"
import Navbar from "./Navbar";
import { Footer } from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="p-4">
        <Outlet /> {/* Acá se renderizan las páginas hijas */}
      </main>
      <Footer />
    </div>
  )
}
