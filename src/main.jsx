import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { MoviesProvider } from "./features/movies/context/MoviesContext";
import { AuthProvider } from "./features/auth/context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <MoviesProvider>
        <RouterProvider router={router} />
      </MoviesProvider>
    </AuthProvider>
  </StrictMode>
);
