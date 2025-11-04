import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [sensorData, setSensorData] = useState({
    soil: 0,
    temperature: 0,
    humidity: 0,
    light: 0
  });



  return (
    <div className="app-container">
      <h1>🌱 AGROVISION Dashboard</h1>
      <div className="card"><h3>Soil Moisture</h3><p>{sensorData.soil}%</p></div>
      <div className="card"><h3>Temperature</h3><p>{sensorData.temperature} °C</p></div>
      <div className="card"><h3>Humidity</h3><p>{sensorData.humidity}%</p></div>
      <div className="card"><h3>Light</h3><p>{sensorData.light} lux</p></div>

      <div className="alert-box">
        {sensorData.soil < 30 && <p>⚠️ Soil too dry!</p>}
        {sensorData.temperature > 38 && <p>⚠️ High temperature!</p>}
      </div>
    </div>
  );
}

export default App;
