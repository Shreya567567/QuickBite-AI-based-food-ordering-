export default function ManageRestaurants() {
  return (
    <div>
      <h1 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#1e293b", marginBottom: "0.5rem" }}>
        Manage Restaurants
      </h1>
      <p style={{ color: "#64748b", marginBottom: "2rem" }}>
        Approve, edit, and manage all restaurants on the platform.
      </p>
      <div style={{
        backgroundColor: "#fff", borderRadius: "1rem", padding: "3rem",
        border: "1px solid #e2e8f0", textAlign: "center",
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#94a3b8", marginBottom: "0.75rem" }}>store</span>
        <p style={{ color: "#64748b", fontWeight: "500" }}>Restaurant management coming soon.</p>
      </div>
    </div>
  );
}
