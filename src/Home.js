import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const backgroundStyle = {
    width: "100%",
    height: "100vh",
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/Background1.png')", // ✅ unchanged
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    color: "white",
    fontFamily: "'Poppins', sans-serif",
    overflowX: "hidden",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    transition: "0.3s ease",
    fontWeight: "500",
  };

  return (
    <div style={backgroundStyle}>
      {/* ✅ Header / Navbar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 40px",
          backgroundColor: "rgba(0, 30, 15, 0.9)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 10,
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
        }}
      >
        {/* Logo + Brand Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/logo1.png"
            alt="AgroVision Logo"
            style={{
              height: "55px",
              width: "280px",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "25px",
            fontSize: "16px",
          }}
        >
          {[
            { name: "Home", path: "/" },
            { name: "Dashboard", path: "/dashboard" },
            { name: "Disease Detection", path: "/disease" },
            { name: "Yield Prediction", path: "/prediction" },
            { name: "Marketplace", path: "/marketplace" },
            { name: "LearningHub", path: "/Learning_hub" },
            { name: "Community", path: "/community" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={linkStyle}
              onMouseOver={(e) => (e.target.style.color = "#FFD700")}
              onMouseOut={(e) => (e.target.style.color = "white")}
            >
              {item.name}
            </Link>
          ))}

          {/* Auth Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <Link
              to="/login"
              style={{
                background: "transparent",
                border: "2px solid #FFD700",
                color: "#FFD700",
                padding: "6px 14px",
                borderRadius: "6px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "#FFD700";
                e.target.style.color = "#0B3D2E";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#FFD700";
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                background: "#FFD700",
                color: "#0B3D2E",
                padding: "6px 14px",
                borderRadius: "6px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#FFD700";
                e.target.style.border = "2px solid #FFD700";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "#FFD700";
                e.target.style.color = "#0B3D2E";
                e.target.style.border = "none";

              }}
            >
              Register
            </Link>
          </div>
        </nav>
      </header>

      {/* ✅ Hero Section */}
      <main
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          maxWidth: "700px",
          padding: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "700",
            color: "#FFD700",
            whiteSpace: "nowrap",
            textShadow: "2px 2px 10px rgba(0,0,0,0.6)",
          }}
        >
          🌱 Welcome to <span style={{ color: "#4CAF50" }}>AGROVISION</span>
        </h1>

        <p
          style={{
            color: "#f5f5f5",
            fontSize: "20px",
            marginTop: "15px",
            lineHeight: "1.6",
            fontWeight: "400",
          }}
        >
          Smart Agriculture Ecosystem powered by <b>IoT, AI & Cloud</b>
        </p>

        <div style={{ marginTop: "35px" }}>
          <Link
            to="/dashboard"
            style={{
              background: "#4CAF50",
              color: "white",
              padding: "12px 25px",
              borderRadius: "8px",
              marginRight: "15px",
              textDecoration: "none",
              fontWeight: "600",
              transition: "0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
            onMouseOver={(e) => (e.target.style.background = "#2E7D32")}
            onMouseOut={(e) => (e.target.style.background = "#4CAF50")}
          >
            Explore Dashboard
          </Link>

          <Link
            to="/marketplace"
            style={{
              background: "transparent",
              color: "#FFD700",
              border: "2px solid #FFD700",
              padding: "12px 25px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "600",
              transition: "0.3s ease",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#FFD700";
              e.target.style.color = "#0B3D2E";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#FFD700";
            }}
          >
            Visit Marketplace
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Home;
