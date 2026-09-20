import { useNavigate } from "react-router-dom";
import "./PaymentMethods.css";

export default function PaymentMethods() {
  const navigate = useNavigate();

  return (
    <div className="payment-methods-container">
      {/* Back to Profile Button & Header */}
      <header className="payment-header">
        <button className="back-btn" onClick={() => navigate("/profile")}>
          <span className="material-symbols-outlined">arrow_back</span>
          <span>Back to Profile</span>
        </button>
        <h1 className="payment-title">Payment Methods</h1>
        <p className="payment-subtitle">
          Configure your preferred payment options. Currently, only Cash on Delivery is supported.
        </p>
      </header>

      <main className="payment-layout-main">
        <div className="options-grid">
          
          {/* Cash on Delivery Card */}
          <div className="payment-option-card active" style={{ cursor: "default" }}>
            <div className="card-selection-indicator">
              <div className="indicator-outer">
                <div className="indicator-inner"></div>
              </div>
            </div>
            <div className="option-info-group">
              <span className="material-symbols-outlined option-icon cod">payments</span>
              <div>
                <h3 className="option-name">Cash on Delivery (COD) <span style={{ fontSize: "0.75rem", backgroundColor: "var(--primary-fixed)", color: "var(--primary)", padding: "0.15rem 0.5rem", borderRadius: "9999px", marginLeft: "0.5rem", fontWeight: "700" }}>DEFAULT</span></h3>
                <p className="option-desc">Pay with cash or scan a delivery partner's QR code upon delivery. This is currently the only accepted payment method.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Note info card */}
        <div style={{
          marginTop: "2rem",
          padding: "1.5rem",
          backgroundColor: "var(--surface-container-low)",
          borderRadius: "1.25rem",
          border: "1px solid var(--border-subtle)",
          display: "flex",
          gap: "1rem",
          alignItems: "center"
        }}>
          <span className="material-symbols-outlined" style={{ color: "var(--primary)", fontSize: "28px" }}>info</span>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--on-surface-variant)", lineHeight: 1.5 }}>
            To keep operations safe and reliable, QuickBite is temporarily accepting only Cash on Delivery. Online payment integrations (UPI, Cards, Wallets) are undergoing maintenance.
          </p>
        </div>
      </main>
    </div>
  );
}
