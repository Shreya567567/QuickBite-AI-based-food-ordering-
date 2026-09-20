import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ROLE_HOME = {
  customer: "/home",
  partner: "/restaurant/dashboard",
  admin: "/admin/dashboard",
};

export default function Unauthorized() {
  const { role } = useAuth();
  const homePath = ROLE_HOME[role] || "/";

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--background)",
      padding: "2rem",
      textAlign: "center",
    }}>
      <span className="material-symbols-outlined" style={{
        fontSize: "72px",
        color: "var(--primary)",
        marginBottom: "1rem",
      }}>lock</span>
      <h1 style={{
        fontSize: "2rem",
        fontWeight: "800",
        color: "var(--on-surface)",
        marginBottom: "0.5rem",
      }}>Access Denied</h1>
      <p style={{
        fontSize: "1rem",
        color: "var(--on-surface-variant)",
        marginBottom: "2rem",
        maxWidth: "400px",
      }}>
        You don't have permission to access this page. Please go back to your dashboard.
      </p>
      <Link to={homePath} style={{
        backgroundColor: "var(--primary-container)",
        color: "#fff",
        padding: "0.75rem 2rem",
        borderRadius: "9999px",
        fontWeight: "700",
        fontSize: "0.9rem",
        textDecoration: "none",
        boxShadow: "0 2px 8px rgba(171, 53, 0, 0.3)",
        transition: "transform 0.2s",
      }}>
        Go Home
      </Link>
    </div>
  );
}
