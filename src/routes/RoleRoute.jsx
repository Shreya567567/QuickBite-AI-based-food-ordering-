import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * RoleRoute — protects routes by requiring authentication + specific roles.
 *
 * Props:
 *   allowedRoles  — array of role strings, e.g. ["customer"] or ["partner"]
 *   children      — the element to render when authorised
 *
 * Behaviour:
 *   • Guest (no user)          → redirect to /login
 *   • User with wrong role     → redirect to that role's home page
 *   • User with matching role  → render children
 */
const ROLE_HOME = {
  customer: "/home",
  partner: "/restaurant/dashboard",
  admin: "/admin/dashboard",
};

export default function RoleRoute({ allowedRoles, children }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // While auth state is loading, show nothing (AuthProvider gates rendering anyway,
  // but this is a safety net for future changes).
  if (loading) return null;

  // Not authenticated → send to login, preserving intended destination
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authenticated but profile hasn't loaded yet (shouldn't happen because
  // AuthProvider waits for profile, but guard just in case)
  if (!profile) return null;

  // Role check
  if (!allowedRoles.includes(profile.role)) {
    const fallback = ROLE_HOME[profile.role] || "/";
    return <Navigate to={fallback} replace />;
  }

  return children;
}
