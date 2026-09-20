import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import GuestLayout from "./GuestLayout";
import CustomerLayout from "./CustomerLayout";

export default function GuestOrCustomerLayout() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--background)", color: "var(--on-background)" }}>
        <p style={{ fontWeight: "600", fontSize: "1.1rem" }}>Loading...</p>
      </div>
    );
  }

  // Redirect role-specific partners and admins to their dashboards
  if (user && profile) {
    if (profile.role === "partner") {
      return <Navigate to="/restaurant/dashboard" replace />;
    }
    if (profile.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  // Use CustomerLayout for logged in customer
  if (user && profile?.role === "customer") {
    return <CustomerLayout />;
  }

  // Use GuestLayout for not logged in guests
  return <GuestLayout />;
}
