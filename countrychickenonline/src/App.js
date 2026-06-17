import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import OrderConfirmation from "./OrderConfirmation";
import Auth from "./Auth";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(() => {
    // Check if user is already logged in from a previous session
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    return username ? { username, role } : null;
  });

  const handleLogin = (username, role) => {
    setUser({ username, role });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setUser(null);
    setCartItems([]);
  };

  const addToCart = (product) => {
    const productId = product.p_id || product.id;
    if (!productId) {
      console.error("Product missing ID:", product);
      return;
    }
    setCartItems((prev) => {
      const existing = prev.find((item) => (item.p_id || item.id) === productId);
      if (existing) {
        return prev.map((item) =>
          (item.p_id || item.id) === productId
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, p_id: productId, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        (item.p_id || item.id) === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => (item.p_id || item.id) !== id));
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              addToCart={addToCart}
              cartCount={cartCount}
              user={user}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" /> : <Auth onLogin={handleLogin} />
          }
        />
        <Route
          path="/cart"
          element={
            user ? (
              <Cart
                cartItems={cartItems}
                updateQty={updateQty}
                removeItem={removeItem}
                cartCount={cartCount}
                setCartItems={setCartItems}
                user={user}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;