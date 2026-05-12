import "./Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Add this import for client-side navigation
import Navbar from "./Navbar";
import CutModal from "./CutModal";

function Home({ addToCart, cartCount }) {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [modalProduct, setModalProduct] = useState(null);
 

  useEffect(() => {
    fetch("http://192.168.3.44:8081/All")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const filters = ["All", "Whole Chicken", "Curry Cut", "Boneless", "Liver & More"];

  return (
    <>
      <Navbar cartCount={cartCount} />
      <div className="home">

        {/* ── HERO ───────────────────────────────────── */}
        <section className="hero">
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot" />
            Now Delivering Across Your City
          </div>

          <h1 className="hero-title">
            Farm to Your<br />
            Table, <em>Fresh</em>
          </h1>

          <p className="hero-subtitle">
            Premium Naatu Kodi — Village Raised &amp; Chemical-Free
          </p>

          <div className="hero-cta-group">
            <button className="hero-btn">Order Fresh Today</button>
            <button className="hero-btn-outline">Browse Products ↓</button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">500+</div>
              <div className="hero-stat-label">Happy Families</div>
            </div>
            <div className="hero-divider" />
            <div className="hero-stat">
              <div className="hero-stat-num">100%</div>
              <div className="hero-stat-label">Farm Raised</div>
            </div>
            <div className="hero-divider" />
            <div className="hero-stat">
              <div className="hero-stat-num">4.9★</div>
              <div className="hero-stat-label">Avg Rating</div>
            </div>
          </div>
        </section>

        {/* ── TRUST BADGES ──────────────────────────── */}
        <section className="trust">
          <div className="trust-item">
            <span className="trust-icon">🐔</span> Village Raised Desi Breed
          </div>
          <div className="trust-item">
            <span className="trust-icon">🌿</span> No Chemicals or Hormones
          </div>
          <div className="trust-item">
            <span className="trust-icon">🚚</span> Same Day Delivery
          </div>
          <div className="trust-item">
            <span className="trust-icon">🧊</span> Hygienically Packed
          </div>
        </section>

        {/* ── PRODUCTS ──────────────────────────────── */}
        <section id= "products" className="products">
          <div className="section-header">
            <div>
              <div className="section-tag">What We Offer</div>
              <h2 className="section-title">Our Products</h2>
              <p className="section-subtitle">Slaughtered fresh daily, delivered to your door</p>
            </div>
            <div className="filter-tabs">
              {filters.map((f) => (
                <button
                  key={f}
                  className={`filter-tab ${activeFilter === f ? "active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {products.map((p) => (
              <div key={p.id} className="product-card">
                <div className="product-image-wrap">
                  <span className="badge">Farm Fresh</span>
                  <button className="wishlist-btn" title="Save">♡</button>
                  <img
                    src={`http://192.168.3.44:8081/${p.img_path}`}
                    alt={p.name}
                    className="product-image"
                  />
                </div>

                <div className="product-info">
                  <div className="product-meta">
                    <span className="product-origin">Naatu Kodi</span>
                    <span className="product-dot" />
                    <span className="product-origin">Village Farm</span>
                  </div>

                  <h3 className="product-name">{p.name}</h3>
                  <p className="product-desc">
                    Village raised, no antibiotics — tender, flavourful &amp; naturally grown.
                  </p>

                  <div className="product-tags">
                    <span className="product-tag">No Hormones</span>
                    <span className="product-tag">Antibiotic-Free</span>
                    <span className="product-tag">Fresh Daily</span>
                  </div>

<div className="price-row">
  <div className="price-group">
    <span className="price-label">Price / kg</span>
    <span className="product-price">₹ {p.price}</span>
  </div>
  <div className="price-actions">
    <button
      className="add-btn"
      onClick={() => {
        if (p.name === "Chicken") {
          setModalProduct(p);
        } else {
          addToCart(p);
        }
      }}
    >
      + ADD
    </button>
    <Link to="/cart" className="view-cart-btn"> {/* Changed from <a href> to <Link> for client-side navigation */}
      🛒 View Cart
    </Link>
  </div>
  
</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY US ────────────────────────────────── */}
        <section className="why-us">
          <div className="section-tag">Why Choose Us</div>
          <h2 className="section-title">Purity You Can Taste</h2>
          <p className="why-us-sub">
            Every bird is raised with care on open village farms — no cages,
            no chemicals, just nature.
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏡</div>
              <div className="feature-title">Open Farm Raised</div>
              <p className="feature-desc">
                Our chickens roam freely in village farms, living a natural life.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌾</div>
              <div className="feature-title">Natural Feed Only</div>
              <p className="feature-desc">
                Fed on grains and greens — never synthetic feed or boosters.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <div className="feature-title">Slaughtered Fresh</div>
              <p className="feature-desc">
                Processed the same morning and delivered before noon to you.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <div className="feature-title">Farmer Direct</div>
              <p className="feature-desc">
                We partner directly with local farmers — no middlemen, fair prices.
              </p>
            </div>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────── */}
        <footer className="footer">
          <div>
            <div className="footer-brand">Country Chicken Online 🐔</div>
            <p>Pure Desi • Direct From Farmers</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="footer-tagline">Naatu Kodi • Naturally Grown</div>
            <p>© 2026 Country Chicken Online. All rights reserved.</p>
          </div>
        </footer>

      </div>

      {modalProduct && (
  <CutModal
    product={modalProduct}
    onClose={() => setModalProduct(null)}
    onAdd={addToCart}
  />
)}
    </>
  );
}

export default Home;