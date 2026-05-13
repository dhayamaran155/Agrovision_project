import React, { useState } from "react";
import "./marketplace.css";

function Marketplace() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const products = [
    { id: 1, name: "Organic Rice", price: 500, image: "/markketplace image/rice.jpg" },
    { id: 2, name: "Wheat", price: 400, image: "/markketplace image/wheat.jpg" },
    { id: 3, name: "Maize (Corn)", price: 300, image: "/markketplace image/maize.jpg" },
    { id: 4, name: "Ragi", price: 220, image: "/markketplace image/ragi.jpg" },
    { id: 5, name: "Barley", price: 180, image: "/markketplace image/barley.png" },
    { id: 6, name: "Green Gram", price: 150, image: "/markketplace image/Green Gram.jpeg" },
    { id: 7, name: "Black Gram", price: 160, image: "/markketplace image/Black Gram.jpeg" },
    { id: 8, name: "Red Gram (Toor Dal)", price: 170, image: "/markketplace image/Red Gram.jpeg" },
    { id: 9, name: "Chickpeas", price: 140, image: "/markketplace image/Chickpeas.jpeg" },
    { id: 10, name: "Groundnuts", price: 130, image: "/markketplace image/Groundnuts.jpeg" },
    { id: 11, name: "Fresh Onions", price: 250, image: "/markketplace image/Fresh Onions.jpeg" },
    { id: 12, name: "Fresh Potatoes", price: 200, image: "/markketplace image/Fresh Potatoes.jpeg" },
    { id: 13, name: "Tomatoes", price: 80, image: "/markketplace image/Tomatoes.jpeg" },
    { id: 14, name: "Brinjal", price: 60, image: "/markketplace image/Brinjal.jpeg" },
    { id: 15, name: "Ladies Finger", price: 70, image: "/markketplace image/Ladies Finger.jpeg" },
    { id: 16, name: "Cabbage", price: 50, image: "/markketplace image/Cabbage.jpeg" },
    { id: 17, name: "Cauliflower", price: 60, image: "/markketplace image/Cauliflower.jpeg" },
    { id: 18, name: "Bananas", price: 80, image: "/markketplace image/Bananas.jpeg" },
    { id: 19, name: "Mangoes", price: 200, image: "/markketplace image/Mangoes.jpeg" },
    { id: 20, name: "Coconut", price: 40, image: "/markketplace image/coconut.jpeg" },
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const increaseQty = (id) =>
    setQuantities({ ...quantities, [id]: (quantities[id] || 1) + 1 });

  const decreaseQty = (id) => {
    const q = quantities[id] || 1;
    if (q > 1) setQuantities({ ...quantities, [id]: q - 1 });
  };

  const addToCart = (product, qty) => {
    setCart([...cart, { ...product, quantity: qty }]);
  };

  const removeFromCart = (index) =>
    setCart(cart.filter((_, i) => i !== index));

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ================= RAZORPAY PAYMENT ================= */

  const payNow = async () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill all customer details");
      return;
    }

    const res = await fetch("http://127.0.0.1:8000/api/orders/payment/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalPrice }),
    });

    const data = await res.json();

    const options = {
      key: data.key,
      amount: data.amount,
      currency: "INR",
      name: "AgroVision",
      description: "Marketplace Order",
      order_id: data.order_id,
      handler: function () {
        alert("Payment Successful 🎉");
        setCart([]);
        setShowCheckout(false);
      },
      prefill: {
        name: customer.name,
        contact: customer.phone,
      },
      theme: { color: "#2e7d32" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="marketplace-container">
      <h1 className="marketplace-title">🌾 AgroVision Marketplace</h1>

      <input
        className="marketplace-search"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="marketplace-main">
        <div className="marketplace-products">
          <div className="products-grid">
            {filteredProducts.map((p) => (
              <div key={p.id} className="product-card">
                <img src={p.image} alt={p.name} className="product-image" />
                <h3 className="product-name">{p.name}</h3>
                <p className="product-price">₹{p.price}</p>

                <div className="quantity-controls">
                  <button className="qty-btn" onClick={() => decreaseQty(p.id)}>−</button>
                  <span className="quantity-display">{quantities[p.id] || 1}</span>
                  <button className="qty-btn" onClick={() => increaseQty(p.id)}>+</button>
                </div>

                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(p, quantities[p.id] || 1)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="marketplace-cart">
          <h2 className="cart-title">🛒 Your Cart</h2>
          {cart.length === 0 ? (
            <p className="cart-empty">No items in cart</p>
          ) : (
            <>
              {cart.map((item, i) => (
                <div key={i} className="cart-item">
                  <span className="cart-item-name">{item.name} ({item.quantity})</span>
                  <span className="cart-item-price">₹{item.price * item.quantity}</span>
                  <button className="remove-btn" onClick={() => removeFromCart(i)}>×</button>
                </div>
              ))}
              <h3 className="cart-total">Total: ₹{totalPrice}</h3>
              <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
                Checkout
              </button>
            </>
          )}
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <div className="modal-overlay">
          <div className="checkout-modal">
            <h2 className="modal-title">Checkout</h2>

            <div className="checkout-form">
              <input
                type="text"
                placeholder="Name"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              />
              <textarea
                placeholder="Address"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              />
            </div>

            <p className="modal-total"><b>Total:</b> ₹{totalPrice}</p>

            <button className="pay-btn" onClick={payNow}>
              Pay with Razorpay
            </button>
            <button className="cancel-btn" onClick={() => setShowCheckout(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Marketplace;
