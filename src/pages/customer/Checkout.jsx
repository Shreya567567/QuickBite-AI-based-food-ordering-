import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, totalItems, clearCart } = useCart();
  const { profile } = useAuth();

  // Address
  const defaultAddress = profile?.addresses?.find(addr => addr.isDefault) || profile?.addresses?.[0] || {
    type: "Default Address",
    text: "Please add a delivery address in your profile."
  };

  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  // Pricing calculations
  const deliveryFee = totalPrice > 0 ? (totalPrice >= 499 ? 0 : 49) : 0;
  const platformFee = totalPrice > 0 ? 5 : 0;
  const grandTotal = totalPrice + deliveryFee + platformFee;

  const handlePlaceOrder = async () => {
    setError("");

    if (totalItems === 0) {
      setError("Your cart is empty. Cannot place an order.");
      return;
    }

    try {
      setPlacingOrder(true);
      // Simulate API call to process payment and create order
      await new Promise(resolve => setTimeout(resolve, 2000));

      const generatedId = "#QB-" + (Math.floor(Math.random() * 9000) + 1000);
      setOrderId(generatedId);
      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      setError("Failed to place order: " + err.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  if (orderPlaced) {
    return (
      <div style={{ backgroundColor: "var(--background)", minHeight: "100vh" }}>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", minHeight: "75vh", textAlign: "center", padding: "2rem"
        }}>
          <div style={{
            width: "8rem", height: "8rem", borderRadius: "50%",
            backgroundColor: "rgba(34,197,94,0.1)", display: "flex", alignItems: "center",
            justifyContent: "center", marginBottom: "1.5rem",
            boxShadow: "0 0 0 16px rgba(34,197,94,0.06)"
          }}>
            <span className="material-symbols-outlined filled" style={{ fontSize: "4rem", color: "var(--success)" }}>
              check_circle
            </span>
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: "900", color: "var(--on-surface)", marginBottom: "0.5rem" }}>
            Order Confirmed! 🎉
          </h1>
          <p style={{ color: "var(--on-surface-variant)", fontSize: "1rem", maxWidth: "24rem", lineHeight: 1.6, marginBottom: "0.5rem" }}>
            Thank you for ordering. Your payment of <strong>₹{grandTotal.toLocaleString()}</strong> has been initiated via Cash on Delivery.
          </p>
          <p style={{ color: "var(--on-surface-variant)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            Estimated delivery window: <strong>25-35 minutes</strong>.
          </p>
          <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: "14px", color: "var(--primary)", fontWeight: "700", marginBottom: "2.5rem" }}>
            ORDER ID: {orderId}
          </p>
          <button
            onClick={() => navigate("/home")}
            style={{
              backgroundColor: "var(--primary)", color: "#fff", padding: "0.875rem 2.5rem",
              borderRadius: "1rem", fontWeight: "700", fontSize: "1rem", border: "none",
              cursor: "pointer", boxShadow: "0 4px 12px rgba(171,53,0,0.25)",
              transition: "transform 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--background)", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <main style={{ maxWidth: "1080px", margin: "0 auto", padding: "2rem 1rem 5rem" }}>
        
        {/* Navigation & Header */}
        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "0.35rem",
              color: "var(--on-surface-variant)", fontWeight: "600", fontSize: "0.85rem",
              marginBottom: "0.75rem", padding: 0
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_back</span>
            Back to Cart
          </button>
          <h1 style={{ fontSize: "2rem", fontWeight: "900", color: "var(--on-surface)", margin: 0, letterSpacing: "-0.03em" }}>
            Checkout
          </h1>
          <p style={{ color: "var(--on-surface-variant)", margin: "0.25rem 0 0 0", fontSize: "0.95rem" }}>
            Review your order items, verify address, and complete checkout.
          </p>
        </div>

        {totalItems === 0 ? (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", padding: "4rem 2rem",
            backgroundColor: "#fff", borderRadius: "1.5rem", border: "1px solid var(--border-subtle)", textAlign: "center"
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: "56px", color: "var(--on-surface-variant)", opacity: 0.4, marginBottom: "1rem" }}>
              shopping_cart
            </span>
            <h2 style={{ fontSize: "1.20rem", fontWeight: "700", color: "var(--on-surface)", marginBottom: "0.5rem" }}>
              Nothing to check out
            </h2>
            <p style={{ color: "var(--on-surface-variant)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
              Your cart is empty. Add some delicious food items first.
            </p>
            <button
              onClick={() => navigate("/home")}
              style={{
                backgroundColor: "var(--primary)", color: "#fff", border: "none",
                padding: "0.75rem 1.5rem", borderRadius: "1rem", fontWeight: "700", cursor: "pointer"
              }}
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.75rem" }} className="checkout-page-layout">
            
            {/* Left Section: Details & Methods */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              
              {/* Step 1: Delivery Address */}
              <section style={{ backgroundColor: "#fff", border: "1px solid var(--border-subtle)", borderRadius: "1.5rem", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <div style={{
                    width: "2rem", height: "2rem", borderRadius: "50%", backgroundColor: "var(--primary)",
                    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "0.9rem"
                  }}>1</div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--on-surface)", margin: 0 }}>Delivery Address</h3>
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", backgroundColor: "var(--surface-container-low)", padding: "1rem", borderRadius: "1rem" }}>
                  <span className="material-symbols-outlined" style={{ color: "var(--primary)", marginTop: "0.15rem" }}>location_on</span>
                  <div>
                    <h4 style={{ margin: "0 0 0.25rem", fontSize: "0.95rem", fontWeight: "700" }}>{defaultAddress.type}</h4>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--on-surface-variant)", lineHeight: 1.5 }}>
                      {defaultAddress.text}
                    </p>
                  </div>
                </div>
              </section>

              {/* Step 2: Payment Method */}
              <section style={{ backgroundColor: "#fff", border: "1px solid var(--border-subtle)", borderRadius: "1.5rem", padding: "1.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <div style={{
                    width: "2rem", height: "2rem", borderRadius: "50%", backgroundColor: "var(--primary)",
                    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "0.9rem"
                  }}>2</div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--on-surface)", margin: 0 }}>Payment Method</h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  
                  {/* COD Option */}
                  <div
                    style={{
                      display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem",
                      border: "1.5px solid var(--primary)",
                      backgroundColor: "rgba(171, 53, 0, 0.02)",
                      borderRadius: "1.25rem", cursor: "default"
                    }}
                  >
                    <div style={{
                      width: "1.25rem", height: "1.25rem", borderRadius: "50%", border: "2px solid var(--primary)",
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                    }}>
                      <div style={{ width: "0.6rem", height: "0.6rem", borderRadius: "50%", backgroundColor: "var(--primary)" }} />
                    </div>
                    <span className="material-symbols-outlined" style={{ fontSize: "28px", color: "var(--primary)" }}>payments</span>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: "0 0 0.15rem 0", fontSize: "0.95rem", fontWeight: "700" }}>
                        Cash on Delivery (COD) <span style={{ fontSize: "0.75rem", backgroundColor: "var(--primary-fixed)", color: "var(--primary)", padding: "0.15rem 0.5rem", borderRadius: "9999px", marginLeft: "0.5rem", fontWeight: "700" }}>DEFAULT</span>
                      </h4>
                      <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                        Pay with cash or scan delivery partner's UPI QR code upon arrival.
                      </p>
                    </div>
                  </div>

                </div>
              </section>

            </div>

            {/* Right Section: Summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <section style={{
                backgroundColor: "#fff", border: "1px solid var(--border-subtle)", borderRadius: "1.5rem", padding: "1.75rem",
                height: "fit-content", position: "sticky", top: "2rem"
              }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "var(--on-surface)", margin: "0 0 1.25rem" }}>Order Summary</h3>
                
                {/* List Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem", borderBottom: "1px dashed var(--border-subtle)", paddingBottom: "1.25rem" }}>
                  {Object.entries(cartItems).map(([id, item]) => (
                    <div key={id} style={{ display: "flex", justifycontent: "space-between", alignItems: "center", gap: "1rem" }}>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: "700", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.name}
                        </p>
                        <p style={{ margin: "0.15rem 0 0", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                          Qty: {item.qty} · ₹{item.price} each
                        </p>
                      </div>
                      <span style={{ fontSize: "0.88rem", fontWeight: "800", color: "var(--on-surface)" }}>
                        ₹{(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subtotals */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <span>Subtotal</span>
                    <span style={{ fontWeight: "600", color: "var(--text-primary)" }}>₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <span>Delivery Fee</span>
                    <span style={{ fontWeight: "600", color: deliveryFee === 0 ? "var(--success)" : "var(--text-primary)" }}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    <span>Platform Fee</span>
                    <span style={{ fontWeight: "600", color: "var(--text-primary)" }}>₹{platformFee}</span>
                  </div>
                </div>

                {/* Total */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <span style={{ fontSize: "0.95rem", fontWeight: "800", color: "var(--on-surface)" }}>Grand Total</span>
                  <span style={{ fontSize: "1.3rem", fontWeight: "900", color: "var(--primary)" }}>₹{grandTotal.toLocaleString()}</span>
                </div>

                {/* Feedback */}
                {error && (
                  <div style={{
                    display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1rem",
                    backgroundColor: "var(--error-container)", color: "var(--on-error-container)",
                    borderRadius: "0.75rem", fontSize: "0.82rem", fontWeight: "600", marginBottom: "1.25rem"
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>error</span>
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={placingOrder}
                  style={{
                    width: "100%", backgroundColor: placingOrder ? "var(--surface-container-high)" : "var(--primary)",
                    color: placingOrder ? "var(--on-surface-variant)" : "#fff", border: "none",
                    padding: "0.875rem", borderRadius: "1rem", fontWeight: "800", fontSize: "0.95rem",
                    cursor: placingOrder ? "default" : "pointer", boxShadow: placingOrder ? "none" : "0 4px 0 var(--primary-dark)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", transition: "all 0.15s"
                  }}
                  onMouseDown={e => { if (!placingOrder) { e.currentTarget.style.transform = "translateY(2px)"; e.currentTarget.style.boxShadow = "0 2px 0 var(--primary-dark)"; }}}
                  onMouseUp={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 0 var(--primary-dark)"; }}
                >
                  {placingOrder ? (
                    <>
                      <div style={{ width: "1rem", height: "1rem", border: "2px solid var(--on-surface-variant)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">shopping_bag</span>
                      Place Order · ₹{grandTotal.toLocaleString()}
                    </>
                  )}
                </button>
              </section>
            </div>

          </div>
        )}

      </main>

      <style>{`
        @media (min-width: 768px) {
          .checkout-page-layout {
            grid-template-columns: 1fr 340px !important;
          }
        }
      `}</style>
    </div>
  );
}
