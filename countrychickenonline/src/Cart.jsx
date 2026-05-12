import { useState } from "react";
import Navbar from "./Navbar";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const DELIVERY_FEE = 40;
const FREE_DELIVERY_THRESHOLD = 499;

function Cart({ cartItems, updateQty, removeItem, cartCount }) {
  const items = cartItems;
  const navigate = useNavigate();

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [removingId, setRemovingId] = useState(null);
  const[placeorder,setplaceorder] = useState(false);

  const handlecheckout = () => {
    setplaceorder(true);
    
    const orderPayload = items.map(i => ({
      id: i.p_id,
      quantity: i.qty
    }));

    fetch("http://192.168.3.44:8082/order", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(orderPayload)
    })
      .then(response => response.json())
      .then(data => {
        const options = {
          key: "rzp_test_RyuXrxAmalMaEG",
          amount: total * 100,
          currency: "INR",
          order_id: data.razorpayOrderId,
          name: "Country-ko",
          description: "Fresh Chicken Order",
          method: {
            card: true,
            netbanking: true,
            upi: true,
            wallet: true,
          },
          config: {
            display: {
              blocks: {
                upi: {
                  name: "Pay with UPI",
                  instruments: [{ method: "upi" }]
                }
              }
            }
          },
          handler: function(razorpayResponse) {  // Renamed to avoid confusion
            fetch("http://192.168.3.44:8082/verfiyPayment", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_signature: razorpayResponse.razorpay_signature
              })
            })
              .then(response => response.text())
              .then(verifyData => {
                if (verifyData === "Payment Verified !") {
                  navigate("/order-confirmation", {
                    state: {
                      paymentId: razorpayResponse.razorpay_payment_id,
                      orderId: razorpayResponse.razorpay_order_id,
                      amount: total,
                      items: items,
                    }
                  });
                } else {
                  alert("Payment verification failed!");
                  setplaceorder(false);
                }
              })
              .catch(err => {
                console.error("Verification error:", err);
                alert(err.message || "Error verifying payment!");
                alert("Error verifying payment!");
                setplaceorder(false);
              });
          }
        };
        
        const rzp = new window.Razorpay(options);
        rzp.open();
      })
      .catch(err => {
        console.error("Order error:", err);
        alert("Error creating order!");
        setplaceorder(false);
      });
  };

  // Wrapper to animate before removing
  const handleRemove = (id) => {
    setRemovingId(id);
    setTimeout(() => {
      removeItem(id);
      setRemovingId(null);
    }, 350);
  };

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const total = subtotal - discount + delivery;
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "NAATU10") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try NAATU10");
      setCouponApplied(false);
    }
  };

  return (
    <>
      <Navbar cartCount={cartCount} />
      <div className="cart-page">

        <div className="cart-header">
          <div className="cart-header-inner">
            <a href="/" className="cart-back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Continue Shopping
            </a>
            <div>
              <h1 className="cart-title">Your Cart</h1>
              <p className="cart-subtitle">
                {totalItems} item{totalItems !== 1 ? "s" : ""} ready for delivery
              </p>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any fresh chicken yet.</p>
            <a href="/" className="cart-shop-btn">Browse Products</a>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items-col">

              {subtotal < FREE_DELIVERY_THRESHOLD && (
                <div className="cart-progress-bar-wrap">
                  <div className="cart-progress-msg">
                    <span>🚚</span>
                    Add <strong>₹{FREE_DELIVERY_THRESHOLD - subtotal}</strong> more for free delivery!
                  </div>
                  <div className="cart-progress-track">
                    <div
                      className="cart-progress-fill"
                      style={{ width: `${Math.min((subtotal / FREE_DELIVERY_THRESHOLD) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              {subtotal >= FREE_DELIVERY_THRESHOLD && (
                <div className="cart-progress-bar-wrap cart-progress-bar-wrap--done">
                  <div className="cart-progress-msg">
                    🎉 You've unlocked <strong>Free Delivery!</strong>
                  </div>
                </div>
              )}

              <div className="cart-items-list">
                {items.map((item, idx) => (
                  <div
                    key={item.p_id}
                    className={`cart-item ${removingId === item.id ? "cart-item--removing" : ""}`}
                    style={{ animationDelay: `${idx * 0.07}s` }}
                  >
                    <div className="cart-item-img-wrap">
                      <img
                        src={`http://192.168.3.44:8081/${item.img_path}`}
                        alt={item.name}
                        className="cart-item-img"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/100x100/fde8c4/a0522d?text=🐔";
                        }}
                      />
                      <span className="cart-item-badge">Fresh</span>
                    </div>

                    <div className="cart-item-details">
                      <div className="cart-item-top">
                        <div>
                          <p className="cart-item-cut">
                            {item.cut ?? "Country Chicken"} · {item.weight ?? "per kg"}
                          </p>
                          <h3 className="cart-item-name">{item.name}</h3>
                          <div className="cart-item-tags">
                            {item.tags
                              ? item.tags.map((t) => (
                                  <span key={t} className="cart-item-tag">{t}</span>
                                ))
                              : (
                                <>
                                  <span className="cart-item-tag">Farm Fresh</span>
                                  <span className="cart-item-tag">No Hormones</span>
                                </>
                              )
                            }
                          </div>
                        </div>
                        <button
                          className="cart-item-remove"
                          onClick={() => handleRemove(item.p_id)}
                          title="Remove item"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                          </svg>
                        </button>
                      </div>

                      <div className="cart-item-bottom">
                        <div className="cart-qty-stepper">
                          <button
                            className="cart-qty-btn"
                            onClick={() => updateQty(item.p_id, -1)}
                            disabled={item.qty <= 1}
                          >−</button>
                          <span className="cart-qty-val">{item.qty}</span>
                          <button
                            className="cart-qty-btn"
                            onClick={() => updateQty(item.p_id, 1)}
                          >+</button>
                        </div>

                        <div className="cart-item-price-wrap">
                          {item.qty > 1 && (
                            <span className="cart-item-unit-price">
                              ₹{item.price} × {item.qty}
                            </span>
                          )}
                          <span className="cart-item-total-price">
                            ₹{item.price * item.qty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-coupon">
                <div className="cart-coupon-icon">🏷️</div>
                <div className="cart-coupon-content">
                  <p className="cart-coupon-label">Have a coupon?</p>
                  <div className="cart-coupon-row">
                    <input
                      type="text"
                      className={`cart-coupon-input ${couponApplied ? "cart-coupon-input--success" : ""} ${couponError ? "cart-coupon-input--error" : ""}`}
                      placeholder="Enter code (try NAATU10)"
                      value={coupon}
                      onChange={(e) => { setCoupon(e.target.value); setCouponError(""); }}
                      disabled={couponApplied}
                    />
                    <button
                      className={`cart-coupon-btn ${couponApplied ? "cart-coupon-btn--applied" : ""}`}
                      onClick={couponApplied
                        ? () => { setCouponApplied(false); setCoupon(""); }
                        : applyCoupon}
                    >
                      {couponApplied ? "✓ Remove" : "Apply"}
                    </button>
                  </div>
                  {couponError && <p className="cart-coupon-error">{couponError}</p>}
                  {couponApplied && <p className="cart-coupon-success">🎉 10% discount applied!</p>}
                </div>
              </div>
            </div>

            <div className="cart-summary-col">
              <div className="cart-summary">
                <h2 className="cart-summary-title">Order Summary</h2>
                <div className="cart-summary-rows">
                  <div className="cart-summary-row">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {couponApplied && (
                    <div className="cart-summary-row cart-summary-row--discount">
                      <span>Discount (NAATU10)</span>
                      <span>− ₹{discount}</span>
                    </div>
                  )}
                  <div className="cart-summary-row">
                    <span>Delivery</span>
                    <span className={delivery === 0 ? "cart-free-tag" : ""}>
                      {delivery === 0 ? "FREE" : `₹${delivery}`}
                    </span>
                  </div>
                </div>
                <div className="cart-summary-divider" />
                <div className="cart-summary-total">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <p className="cart-summary-note">
                  ✅ Inclusive of all taxes &amp; freshness guarantee
                </p>
                <button disabled={placeorder} className="cart-checkout-btn" onClick={handlecheckout}>
                 {placeorder ? "Placing Order..." : "Proceed to Checkout"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
                <button className="cart-continue-btn" onClick={() => window.history.back()}>
                  ← Continue Shopping
                </button>
                <div className="cart-trust-grid">
                  <div className="cart-trust-item"><span>🔒</span> Secure Payment</div>
                  <div className="cart-trust-item"><span>🌿</span> Farm Fresh</div>
                  <div className="cart-trust-item"><span>🚚</span> Fast Delivery</div>
                  <div className="cart-trust-item"><span>↩️</span> Easy Returns</div>
                </div>
              </div>

              <div className="cart-freshness-card">
                <div className="cart-freshness-icon">🐔</div>
                <div>
                  <p className="cart-freshness-title">Slaughtered Fresh Today</p>
                  <p className="cart-freshness-desc">
                    Your order will be prepared fresh on delivery day — no frozen, no stored.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="cart-footer">
        <p>© 2026 Country Chicken Online &nbsp;•&nbsp; Pure Desi · Direct From Farmers</p>
      </footer>
    </>
  );
}

export default Cart;