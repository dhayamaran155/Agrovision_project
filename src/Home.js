import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import { useLanguage } from "./LanguageContext";
import "./home.css";

const translations = {
  en: {
    title: "SMART FARMERS' WEB APP FOR CROP MONITORING & ADVISORY",
    description:
      "All-in-one portal combining monitoring, AI crop prediction, learning, disease detection, and e-commerce support.",
    button: "GET STARTED",
  },
  ta: {
    title:
      "புத்திசாலி விவசாயிகளின் வலை பயன்பாடு பயிர் கண்காணிப்பு மற்றும் ஆலோசனைக்கு",
    description:
      "கண்காணிப்பு, AI பயிர் கணிப்பு, கற்றல், நோய் கண்டறிதல் மற்றும் மின் வணிக ஆதரவை ஒருங்கிணைக்கும் ஒரு-இல்-அனைத்து போர்டல்.",
    button: "தொடங்கு",
  },
};

function Home() {
  const { language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hello/")
      .then((res) => res.json())
      .then((data) => console.log(data.message))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page-wrapper">
      <Header />

      <main className="home-main">
        <section className="hero-container">
          <div className="hero-text">
            <h1>{translations[language].title}</h1>

            <p>
              <b>
                <i>{translations[language].description}</i>
              </b>
            </p>

            <button type="button" onClick={() => navigate("/dashboards")}>
              {translations[language].button}
            </button>
          </div>

          <div className="hero-image">
            
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
