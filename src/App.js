import React from "react";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext";
import { AuthProvider } from "./AuthContext";
import { Layout } from "./components/layout/layout";
import Home from "./Home";
import { Dashboard } from "./pages/Dashboard";
import Login from "./Login";
import Register from "./Register";
import Dashboards  from "./Dashboards";
import Marketplace from "./marketplace";
import LearningHub from "./Learning_hub";
import DiseaseUpload from "./Dieases_Detection";
import Yield from "./yield_prediction";
import Profile from "./profile";
import Community from "./Community";
import { Chatbot } from "./pages/Chatbot";
import { CropPlanning } from "./pages/CropPlanning";
import { DiseaseDetection } from "./pages/DiseaseDetection";
import { Schemes } from "./pages/Schemes";
import { Videos } from "./pages/Videos";










function App() {
  
  return (
    <LanguageProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboards" element={<Dashboards />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/Learning_hub" element={<LearningHub />} />
          <Route path="/Dieases_Detection" element={<DiseaseUpload />} />
          <Route path="/prediction" element={<Yield />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/crop" element={<CropPlanning />} />
          <Route path="/disease" element={<DiseaseDetection />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/videos" element={<Videos />} />
        </Routes>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
