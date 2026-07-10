import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar cartCount={0} />
      <div className="order-confirmation-page">
        <div className="order-confirmation-content">
          <div className="confirmation-hero">
            <div className="confirmation-success-circle">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <div className="confirmation-badge">
              <div className="confirmation-badge-dot"></div>
              Order Confirmed
            </div>

            <h1 className="confirmation-title">Thank you for your order!</h1>
            <p className="confirmation-text">Your fresh country chicken is being prepared. We'll notify you when it's out for delivery.</p>
            <p className="confirmation-meta">
              Order ID: <strong>{state?.orderId}</strong> · Payment ID: <strong>{state?.paymentId}</strong>
            </p>
          </div>

          <div className="confirmation-banner">
            <span className="confirmation-banner-icon">🌿</span>
            <div>
              <div className="confirmation-banner-title">Slaughtered Fresh on Delivery Day</div>
              <div className="confirmation-banner-copy">No frozen, no stored. Your order is prepared fresh — straight from the farm to your plate.</div>
            </div>
          </div>

          <div className="confirmation-card">
            <div className="confirmation-card-header">
              <div className="confirmation-card-mark"></div>
              Order Summary
            </div>
            {state?.items?.map((item) => (
              <div key={item.p_id} className="confirmation-card-row">
                <span className="confirmation-card-label">{item.name} × {item.qty}</span>
                <span className="confirmation-card-value">₹{item.price * item.qty}</span>
              </div>
            ))}
            <div className="confirmation-total-row">
              <span>Total Paid</span>
              <span className="confirmation-total-amount">₹{state?.amount}</span>
            </div>
          </div>

          <div className="confirmation-card">
            <div className="confirmation-card-header">
              <div className="confirmation-card-mark"></div>
              Payment Details
            </div>
            <div className="confirmation-card-row">
              <span className="confirmation-card-label">Payment Status</span>
              <span className="confirmation-card-value">✓ Paid</span>
            </div>
            <div className="confirmation-card-row">
              <span className="confirmation-card-label">Transaction ID</span>
              <span className="confirmation-card-value">{state?.paymentId}</span>
            </div>
          </div>

          <div className="confirmation-step-grid">
            {[
              { icon: "✅", title: "Order Placed", desc: "Just now" },
              { icon: "🔪", title: "Preparation", desc: "Fresh on delivery day" },
              { icon: "🚚", title: "Delivery", desc: "Arriving soon" },
            ].map((step) => (
              <div key={step.title} className="confirmation-step-card">
                <div className="confirmation-step-icon">{step.icon}</div>
                <div className="confirmation-step-title">{step.title}</div>
                <div className="confirmation-step-desc">{step.desc}</div>
              </div>
            ))}
          </div>

          <button className="confirmation-action-btn" onClick={() => navigate("/")}>Continue Shopping</button>
        </div>
      </div>

      <footer className="order-confirmation-footer">
        <p>© 2026 Country Chicken Online · Pure Desi · Direct From Farmers</p>
      </footer>
    </>
  );
};

export default OrderConfirmation;
