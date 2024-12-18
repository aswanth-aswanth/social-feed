import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../contexts/authStore";
import Loading from "./Loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, initialized } = useAuthStore();

  if (!initialized || loading) return <Loading />;
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default ProtectedRoute;
