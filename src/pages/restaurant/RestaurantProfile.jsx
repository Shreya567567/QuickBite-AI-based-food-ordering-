import { useAuth } from "../../context/AuthContext";

export default function RestaurantProfile() {
  const { user, profile } = useAuth();

  return (
    <div>
      <h1 style={{ fontSize: "1.6rem", fontWeight: "800", color: "var(--on-surface)", marginBottom: "0.5rem" }}>
        Partner Profile
      </h1>
      <p style={{ color: "var(--on-surface-variant)", marginBottom: "2rem" }}>
        Manage your partner account details.
      </p>

      <div style={{
        backgroundColor: "#fff",
        borderRadius: "1rem",
        border: "1px solid var(--border-subtle)",
        padding: "2rem",
        maxWidth: "500px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{
            width: "4rem", height: "4rem", borderRadius: "9999px", overflow: "hidden",
            border: "2px solid var(--primary-fixed-dim)", flexShrink: 0,
          }}>
            <img
              src={profile?.profileImage || user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--on-surface)" }}>
              {profile?.name || "Partner"}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--on-surface-variant)" }}>
              {profile?.email || user?.email}
            </p>
            <span style={{
              display: "inline-block", marginTop: "0.25rem",
              fontSize: "0.7rem", fontWeight: "700", textTransform: "uppercase",
              color: "var(--primary)", backgroundColor: "var(--primary-fixed)",
              padding: "0.15rem 0.5rem", borderRadius: "9999px",
            }}>QuickBite Partner</span>
          </div>
        </div>
      </div>
    </div>
  );
}
