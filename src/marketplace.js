import React, { useState } from "react";

function Marketplace() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const products = [
    { id: 1, name: "Organic Rice", price: 500, image: "/markketplace image/rice.jpg" },
    { id: 2, name: "Wheat", price: 400, image: "/markketplace image/wheat.jpg" },
    { id: 3, name: "Maize (Corn)", price: 300, image: "/markketplace image/maize.jpg" },
    { id: 4, name: "Ragi", price: 220, image: "/markketplace image/ragi.jpg" },
    { id: 5, name: "Barley", price: 180, image: "/markketplace image/barley.png" },
    { id: 6, name: "Green Gram", price: 150, image: "/markketplace image/Green Gram.jpeg" },
    { id: 7, name: "Black Gram", price: 160, image: "/markketplace image/Black Gram.jpeg" },
    { id: 8, name: "Red Gram (Toor Dal)", price: 170, image: "/markketplace image/Red Gram.jpeg" },
    { id: 9, name: "Chickpeas ", price: 140, image: "/markketplace image/Chickpeas.jpeg" },
    { id: 10, name: "Groundnuts ", price: 130, image: "/markketplace image/Groundnuts.jpeg" },
    { id: 11, name: "Fresh Onions ", price: 250, image: "/markketplace image/Fresh Onions.jpeg" },
    { id: 12, name: "Fresh Potatoes ", price: 200, image: "/markketplace image/Fresh Potatoes.jpeg" },
    { id: 13, name: "Tomatoes ", price: 80, image: "/markketplace image/Tomatoes.jpeg" },
    { id: 14, name: "Brinjal ", price: 60, image: "/markketplace image/Brinjal.jpeg" },
    { id: 15, name: "Ladies Finger (Okra) ", price: 70, image: "/markketplace image/Ladies Finger.jpeg" },
    { id: 16, name: "Cabbage (1pc)", price: 50, image: "/markketplace image/Cabbage.jpeg" },
    { id: 17, name: "Cauliflower (1pc)", price: 60, image: "/markketplace image/Cauliflower.jpeg" },
    { id: 18, name: "Bananas (1 dozen)", price: 80, image: "/markketplace image/Bananas.jpeg" },
    { id: 19, name: "Mangoes", price: 200, image: "/markketplace image/Mangoes.jpeg" },
    { id: 20, name: "Coconut (1pc)", price: 40, image: "/markketplace image/coconut.jpeg" },
  ];

  const addToCart = (product, qty) => {
    if (qty < 1) return; // don't allow zero qty
    setCart([...cart, { ...product, quantity: qty }]);
  };

  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // track qty for each product
  const [quantities, setQuantities] = useState({});

  const handleQtyChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌾 Marketplace</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder=" Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.search}
      />

      {/* Product Grid */}
      <div style={styles.productsGrid}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3>{product.name}</h3>
            <p style={styles.price}>₹{product.price}</p>

            {/* Quantity Input */}
            <input
              type="number"
              min="1"
              value={quantities[product.id] || 1}
              onChange={(e) => handleQtyChange(product.id, parseInt(e.target.value))}
              style={styles.qtyInput}
            />

            <button
              style={styles.button}
              onClick={() => addToCart(product, quantities[product.id] || 1)}
            >
              Add {quantities[product.id] } Kg
            </button>
          </div>
        ))}
      </div>

      {/* Cart - Always Visible */}
      <div style={styles.cartBox}>
        <h2> Your Cart</h2>
        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <>
            <ul style={styles.cartList}>
              {cart.map((item, index) => (
                <li key={index} style={styles.cartItem}>
                  <span>
                    {item.name} ({item.quantity} Kg)
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                  <button style={styles.removeButton} onClick={() => removeFromCart(index)}>
                    Cancel
                  </button>
                </li>
              ))}
            </ul>
            <h3 style={styles.total}>Total: ₹{totalPrice}</h3>
             <button style={styles.buyButton}>Buy Now</button>
          </>
        )}
      </div>
    </div>
  );
}

// Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
    minHeight: "100vh",
    background: "linear-gradient(to right, #d4fc79, #96e6a1)", // soft gradient
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#2e7d32",
    fontSize: "2.2rem",
    fontWeight: "bold",
  },
  search: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    fontSize: "1rem",
    outline: "none",
    width: "100%",
    maxWidth: "400px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  price: {
    fontWeight: "bold",
    color: "#388e3c",
  },
  qtyInput: {
    width: "40px",
    padding: "5px",
    marginTop: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    textAlign: "center",
  },
  button: {
    marginTop: "10px",
    marginLeft:"10px",
    padding: "8px 15px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#4caf50",
    color: "white",
    cursor: "pointer",
  },
  cartBox: {
    marginTop: "30px",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
  },
  cartList: {
    listStyle: "none",
    padding: 0,
    margin: "10px 0",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #eee",
  },
  removeButton: {
    background: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "4px 8px",
    cursor: "pointer",
  },
  total: {
    marginTop: "15px",
    textAlign: "right",
    fontWeight: "bold",
    color: "#2e7d32",
  },
    buyButton: {
    marginTop: "15px",
    marginLeft:"50%",
    padding: "12px",
    width: "150px",
    background: "#04222eff",
    color: "#fff",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

};

export default Marketplace;
