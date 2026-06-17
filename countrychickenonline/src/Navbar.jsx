
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ cartCount = 0, user, onLogout }) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartBump, setCartBump] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bump animation when cart count changes
  useEffect(() => {
    if (cartCount > 0) {
      setCartBump(true);
      const t = setTimeout(() => setCartBump(false), 400);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  return (
    <>
      {/* ── TOP ANNOUNCEMENT BAR ─────────────────────── */}
      <div className="nav-announce">
        <span className="announce-dot" />
        🚚 Free delivery on orders above ₹499 &nbsp;•&nbsp; Same day delivery available
        <span className="announce-dot" />
      </div>

      {/* ── MAIN NAVBAR ──────────────────────────────── */}
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>

        {/* Brand */}
        <a href="/" className="nav-brand">
          <div className="nav-logo">
            <span className="nav-logo-emoji">🐔</span>
          </div>
          <div className="nav-brand-text">
            <span className="nav-brand-name">Country Ko</span>
            <span className="nav-brand-sub">Mana Kodi, Mana Ruchi ❤️</span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          {[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: "Our Farm", href: "/farm" },
            { label: "Recipes", href: "/recipes" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <li key={link.label}>
              <a href={link.href} className="nav-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          {/* Search */}
          <button className="nav-icon-btn" title="Search" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {/* Account */}
         {/* Account */}
{user ? (
  <div className="nav-user">
    <span className="nav-username">👤 {user.username}</span>
    <button className="nav-logout-btn" onClick={onLogout}>Logout</button>
  </div>
) : (
  <button className="nav-icon-btn" title="Account" aria-label="Account" onClick={() => navigate("/login")}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  </button>
)}

          {/* Cart */}
          <button className={`nav-cart-btn ${cartBump ? "nav-cart-btn--bump" : ""}`} aria-label="Cart" onClick={() => navigate("/cart")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="nav-cart-label">Cart</span>
            {cartCount > 0 && (
              <span className="nav-cart-badge">{cartCount}</span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className={`nav-hamburger ${menuOpen ? "nav-hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ────────────────────────────── */}
      <div className={`nav-drawer ${menuOpen ? "nav-drawer--open" : ""}`}>
        <div className="nav-drawer-inner">
          <div className="nav-drawer-brand">
            <span>🐔</span> Country Chicken Online
          </div>
          <ul className="nav-drawer-links">
            {["Home", "Shop", "Our Farm", "Recipes", "Contact"].map((item) => (
              <li key={item}>
                <a href="/" className="nav-drawer-link" onClick={() => setMenuOpen(false)}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-drawer-footer">
            <button className="nav-drawer-cart-btn" onClick={() => { navigate("/cart"); setMenuOpen(false); }}>
              🛒 View Cart {cartCount > 0 && <span>({cartCount})</span>}
            </button>
            <p>🚚 Free delivery above ₹499</p>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className="nav-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </>
  );
}

export default Navbar;