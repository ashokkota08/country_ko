import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar cartCount={0} />
      <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fdf6ec", minHeight: "100vh" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", padding: "48px 24px 80px" }}>

          {/* Success Icon */}
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <div style={{ width: "80px", height: "80px", background: "#3a6b35", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(58,107,53,0.1)", border: "1px solid rgba(58,107,53,0.25)", color: "#3a6b35", fontSize: "0.72rem", fontWeight: "600", letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "50px", marginBottom: "20px" }}>
              <div style={{ width: "6px", height: "6px", background: "#3a6b35", borderRadius: "50%" }}></div>
              Order Confirmed
            </div>

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: "900", color: "#2c1a0e", marginBottom: "8px" }}>
              Thank you for your order!
            </h1>
            <p style={{ fontSize: "0.95rem", color: "#8a6a55", marginBottom: "16px" }}>
              Your fresh country chicken is being prepared. We'll notify you when it's out for delivery.
            </p>
            <p style={{ fontSize: "0.78rem", color: "#8a6a55", marginBottom: "32px" }}>
              Order ID: <strong style={{ color: "#6b3d1e" }}>{state.orderId}</strong> &nbsp;·&nbsp; Payment ID: <strong style={{ color: "#6b3d1e" }}>{state.paymentId}</strong>
            </p>
          </div>

          {/* Freshness Banner */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", background: "rgba(58,107,53,0.06)", border: "1px solid rgba(58,107,53,0.15)", borderRadius: "14px", padding: "16px 20px", marginBottom: "20px" }}>
            <span style={{ fontSize: "28px" }}>🌿</span>
            <div>
              <div style={{ fontSize: "0.88rem", fontWeight: "600", color: "#3a6b35", marginBottom: "2px" }}>Slaughtered Fresh on Delivery Day</div>
              <div style={{ fontSize: "0.78rem", color: "#8a6a55", lineHeight: "1.4" }}>No frozen, no stored. Your order is prepared fresh — straight from the farm to your plate.</div>
            </div>
          </div>

          {/* Order Summary Card */}
          <div style={{ background: "#fffaf4", borderRadius: "20px", border: "1px solid rgba(160,82,45,0.15)", padding: "28px", marginBottom: "20px" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: "700", color: "#2c1a0e", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "8px", height: "8px", background: "#e8651a", borderRadius: "50%" }}></div>
              Order Summary
            </div>
            {state.items.map((item) => (
              <div key={item.p_id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(160,82,45,0.1)", fontSize: "0.9rem" }}>
                <span style={{ color: "#8a6a55" }}>{item.name} × {item.qty}</span>
                <span style={{ fontWeight: "500", color: "#2c1a0e" }}>₹{item.price * item.qty}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "16px 0 0", fontSize: "1.1rem", fontWeight: "700", color: "#2c1a0e", borderTop: "2px solid rgba(160,82,45,0.2)", marginTop: "8px" }}>
              <span>Total Paid</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#e8651a" }}>₹{state.amount}</span>
            </div>
          </div>

          {/* Payment Details Card */}
          <div style={{ background: "#fffaf4", borderRadius: "20px", border: "1px solid rgba(160,82,45,0.15)", padding: "28px", marginBottom: "20px" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: "700", color: "#2c1a0e", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "8px", height: "8px", background: "#e8651a", borderRadius: "50%" }}></div>
              Payment Details
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(160,82,45,0.1)", fontSize: "0.9rem" }}>
              <span style={{ color: "#8a6a55" }}>Payment Status</span>
              <span style={{ fontWeight: "600", color: "#3a6b35" }}>✓ Paid</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: "0.9rem" }}>
              <span style={{ color: "#8a6a55" }}>Transaction ID</span>
              <span style={{ fontWeight: "500", color: "#e8651a", fontSize: "0.82rem" }}>{state.paymentId}</span>
            </div>
          </div>

          {/* Steps */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "28px" }}>
            {[
              { icon: "✅", title: "Order Placed", desc: "Just now" },
              { icon: "🔪", title: "Preparation", desc: "Fresh on delivery day" },
              { icon: "🚚", title: "Delivery", desc: "Arriving soon" },
            ].map((step) => (
              <div key={step.title} style={{ background: "#fffaf4", borderRadius: "16px", border: "1px solid rgba(160,82,45,0.15)", padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>{step.icon}</div>
                <div style={{ fontSize: "0.8rem", fontWeight: "600", color: "#2c1a0e", marginBottom: "4px" }}>{step.title}</div>
                <div style={{ fontSize: "0.72rem", color: "#8a6a55", lineHeight: "1.4" }}>{step.desc}</div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <button
            onClick={() => navigate("/")}
            style={{ width: "100%", background: "#e8651a", color: "#fff", border: "none", padding: "16px", borderRadius: "50px", fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", fontWeight: "700", cursor: "pointer", marginBottom: "12px" }}>
            Continue Shopping
          </button>

        </div>
      </div>

      <footer style={{ background: "#1a0e07", color: "rgba(255,255,255,0.5)", padding: "28px 5%", textAlign: "center", fontSize: "0.82rem" }}>
        <p>© 2026 Country Chicken Online &nbsp;•&nbsp; Pure Desi · Direct From Farmers</p>
      </footer>
    </>
  );
}

export default OrderConfirmation;