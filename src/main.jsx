import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { MoviesProvider } from './features/movies/context/MoviesContext'
import { ConfigProvider } from './features/games/vsBattle/context/ConfigContext'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MoviesProvider>
      <ConfigProvider>
        <RouterProvider router={router} />
      </ConfigProvider>
    </MoviesProvider>
  </StrictMode>
)