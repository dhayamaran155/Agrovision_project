import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import "./style.css";

const translations = {
  en: {
    home: "Home",
    dashboard: "Dashboard",
    marketplace: "Marketplace",
    learningHub: "Learning Hub",
    tagline: "Smart Agriculture for a Sustainable Future 🌱",
  },
  ta: {
    home: "முகப்பு",
    dashboard: "டாஷ்போர்டு",
    marketplace: "சந்தை",
    learningHub: "கற்றல் மையம்",
    tagline: "நிலையான எதிர்காலத்திற்கான புத்திசாலி விவசாயம் 🌱",
  },
};

function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="home-footer">
      <div className="footer-links">
        <Link to="/">{translations[language].home}</Link>
        <span>|</span>
        <Link to="/dashboard">{translations[language].dashboard}</Link>
        <span>|</span>
        <Link to="/marketplace">{translations[language].marketplace}</Link>
        <span>|</span>
        <Link to="/Learning_hub">{translations[language].learningHub}</Link>
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} <strong>AGROVISION</strong>. All rights reserved.
      </p>

      <p className="footer-tagline">
        {translations[language].tagline}
      </p>
    </footer>
  );
}

export default Footer;
