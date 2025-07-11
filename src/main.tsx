import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext"; // 👈 importa AuthProvider
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App /> {/* App ahora contiene el RouterProvider */}
    </AuthProvider>
  </React.StrictMode>
);
