import { Link } from "react-router-dom";

export default function NotFound() {
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
        color: "var(--on-surface-variant)",
        marginBottom: "1rem",
        opacity: 0.5,
      }}>search_off</span>
      <h1 style={{
        fontSize: "4rem",
        fontWeight: "900",
        color: "var(--primary)",
        marginBottom: "0.25rem",
        lineHeight: 1,
      }}>404</h1>
      <p style={{
        fontSize: "1.25rem",
        fontWeight: "600",
        color: "var(--on-surface)",
        marginBottom: "0.5rem",
      }}>Page Not Found</p>
      <p style={{
        fontSize: "0.95rem",
        color: "var(--on-surface-variant)",
        marginBottom: "2rem",
        maxWidth: "400px",
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" style={{
        backgroundColor: "var(--primary-container)",
        color: "#fff",
        padding: "0.75rem 2rem",
        borderRadius: "9999px",
        fontWeight: "700",
        fontSize: "0.9rem",
        textDecoration: "none",
        boxShadow: "0 2px 8px rgba(171, 53, 0, 0.3)",
      }}>
        Back to Home
      </Link>
    </div>
  );
}
