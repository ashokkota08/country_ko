import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";
import OrderConfirmation from "./OrderConfirmation";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.p_id === product.p_id);
      if (existing) {
        return prev.map((item) =>
          item.p_id === product.p_id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.p_id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.p_id !== id));
  };

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} cartCount={cartCount} />} />
        <Route path="/order-confirmation" element={<OrderConfirmation/>} />
        <Route path="/cart" element={
          <Cart
            cartItems={cartItems}
            updateQty={updateQty}
            removeItem={removeItem}
            cartCount={cartCount}
            setCartItems={setCartItems}
          />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;