// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import App from "./App";
import "./App.css";
import Marketplace from "./marketplace";
import LearningHub from "./Learning_hub";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />          {/* Home page */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<App />} />
      <Route path="/marketplace" element={<Marketplace/>}/>
      <Route path="/Learning_hub" element={<LearningHub/>}/>
    </Routes>
  </BrowserRouter>
);
