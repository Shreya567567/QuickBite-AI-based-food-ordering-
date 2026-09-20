export default function RestaurantSettings() {
  return (
    <div>
      <h1 style={{ fontSize: "1.6rem", fontWeight: "800", color: "var(--on-surface)", marginBottom: "0.5rem" }}>
        Restaurant Settings
      </h1>
      <p style={{ color: "var(--on-surface-variant)", marginBottom: "2rem" }}>
        Configure business hours, delivery radius, and account preferences.
      </p>

      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "4rem 2rem", backgroundColor: "#fff",
        borderRadius: "1rem", border: "1px solid var(--border-subtle)", textAlign: "center",
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: "56px", color: "#94a3b8", marginBottom: "1rem" }}>
          settings
        </span>
        <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--on-surface)", marginBottom: "0.5rem" }}>
          Settings coming soon
        </h2>
        <p style={{ color: "var(--on-surface-variant)", fontSize: "0.9rem" }}>
          Business hours, delivery radius, coupons, and more will be configurable here.
        </p>
      </div>
    </div>
  );
}
