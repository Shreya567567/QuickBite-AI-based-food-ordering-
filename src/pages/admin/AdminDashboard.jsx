export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "—", icon: "group", color: "#6366f1" },
    { label: "Total Restaurants", value: "—", icon: "store", color: "#f59e0b" },
    { label: "Active Orders", value: "—", icon: "receipt_long", color: "#10b981" },
    { label: "Revenue", value: "—", icon: "payments", color: "#ef4444" },
  ];

  return (
    <div>
      <h1 style={{ fontSize: "1.6rem", fontWeight: "800", color: "#1e293b", marginBottom: "0.5rem" }}>
        Admin Dashboard
      </h1>
      <p style={{ color: "#64748b", marginBottom: "2rem" }}>
        Platform overview and analytics.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem",
      }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{
            backgroundColor: "#fff",
            borderRadius: "1rem",
            padding: "1.5rem",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}>
            <div style={{
              width: "3rem", height: "3rem", borderRadius: "0.75rem",
              backgroundColor: stat.color + "14",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span className="material-symbols-outlined" style={{ color: stat.color, fontSize: "24px" }}>{stat.icon}</span>
            </div>
            <div>
              <p style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: "500" }}>{stat.label}</p>
              <p style={{ fontSize: "1.5rem", fontWeight: "800", color: "#1e293b" }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
