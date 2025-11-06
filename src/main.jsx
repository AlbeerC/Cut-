import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import ApiProvider from './features/movies/context/ApiContext'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiProvider>
      <RouterProvider router={router} />
    </ApiProvider>
  </StrictMode>
)