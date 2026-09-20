export default function RestaurantOrders() {
  return (
    <div>
      <h1 style={{ fontSize: "1.6rem", fontWeight: "800", color: "var(--on-surface)", marginBottom: "0.5rem" }}>
        Incoming Orders
      </h1>
      <p style={{ color: "var(--on-surface-variant)", marginBottom: "2rem" }}>
        Manage incoming, preparing, and completed orders.
      </p>

      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "4rem 2rem", backgroundColor: "#fff",
        borderRadius: "1rem", border: "1px solid var(--border-subtle)", textAlign: "center",
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: "56px", color: "#94a3b8", marginBottom: "1rem" }}>
          receipt_long
        </span>
        <h2 style={{ fontSize: "1.2rem", fontWeight: "700", color: "var(--on-surface)", marginBottom: "0.5rem" }}>
          No orders right now
        </h2>
        <p style={{ color: "var(--on-surface-variant)", fontSize: "0.9rem" }}>
          New orders from customers will appear here in real-time.
        </p>
      </div>
    </div>
  );
}
