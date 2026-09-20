import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, profile } = useAuth();

  if (!user) {
    const loginPath = requiredRole === "partner" ? "/partner-login" : "/login";
    return <Navigate to={loginPath} replace />;
  }

  // If role is required, ensure profile exists and role matches
  if (requiredRole && (!profile || profile.role !== requiredRole)) {
    const fallbackPath = profile?.role === "partner" ? "/restaurant-dashboard" : "/home";
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
}
