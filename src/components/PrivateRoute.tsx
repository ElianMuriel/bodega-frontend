import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}
