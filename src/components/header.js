import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import { useAuth } from "../AuthContext";
import "./style.css";

const translations = {
  en: {
    home: "Home",
    dashboards: "Dashboard",
    diseaseDetection: "Disease Detection",
    yieldPrediction: "Yield Prediction",
    marketplace: "Marketplace",
    learningHub: "LearningHub",
    community: "Community",
    login: "Login",
    register: "Register",
    logout: "Logout",
  },
  ta: {
    home: "முகப்பு",
    dashboard: "டாஷ்போர்டு",
    diseaseDetection: "நோய் கண்டறிதல்",
    yieldPrediction: "விளைச்சல் கணிப்பு",
    marketplace: "சந்தை",
    learningHub: "கற்றல் மையம்",
    community: "சமூகம்",
    login: "உள்நுழை",
    register: "பதிவு",
    logout: "வெளியேறு",
  },
};

function Header() {
  const { language, toggleLanguage } = useLanguage();
  const { isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <img src="/Agrologo1.png" alt="AgroVision Logo" className="site-logo" />

      <button
        className="menu-toggle"
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
      >
        {menuOpen ? "Close" : "Menu"}
      </button>

      <nav className={`site-nav ${menuOpen ? "open" : ""}`}>
        <div className="nav-links-wrap">
          {[
            { name: translations[language].home, path: "/" },
            { name: translations[language].dashboards, path: "/dashboards" },
            { name: translations[language].diseaseDetection, path: "/Dieases_Detection" },
            { name: translations[language].yieldPrediction, path: "/prediction" },
            { name: translations[language].marketplace, path: "/marketplace" },
            { name: translations[language].learningHub, path: "/Learning_hub" },
            { name: translations[language].community, path: "/Community" },
          ].map((item) => (
            <Link key={item.name} to={item.path} className="nav-link" onClick={closeMenu}>
              {item.name}
            </Link>
          ))}
        </div>

        <div className="auth-controls">
          <button onClick={toggleLanguage} className="toggle-btn-header" type="button">
            {language === "en" ? "தமிழ்" : "English"}
          </button>

          {!isLoggedIn ? (
            <>
              <Link to="/login" className="register-btn" onClick={closeMenu}>
                {translations[language].login}
              </Link>
              <Link to="/register" className="register-btn" onClick={closeMenu}>
                {translations[language].register}
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="register-btn"
              style={{ border: "none", cursor: "pointer" }}
              type="button"
            >
              {translations[language].logout}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
