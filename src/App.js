import React, { useState, useEffect } from "react";



function Home() {
  const [sensorData, setSensorData] = useState({
    soil: 0,
    temperature: 0,
    humidity: 0,
    light: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData({
        soil: Math.floor(Math.random() * 101),
        temperature: Math.floor(Math.random() * 45),
        humidity: Math.floor(Math.random() * 101),
        light: Math.floor(Math.random() * 1001),
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <h1>🌱 AGROVISION Dashboard</h1>

      <div className="card-container">
        <div className="card">
          <h3>Soil Moisture</h3>
          <p>{sensorData.soil}%</p>
        </div>
        <div className="card">
          <h3>Temperature</h3>
          <p>{sensorData.temperature} °C</p>
        </div>
        <div className="card">
          <h3>Humidity</h3>
          <p>{sensorData.humidity}%</p>
        </div>
        <div className="card">
          <h3>Light</h3>
          <p>{sensorData.light} lux</p>
        </div>
      </div>

      <div className="alert-box">
        {sensorData.soil < 30 && <p>⚠️ Soil too dry!</p>}
        {sensorData.temperature > 38 && <p>⚠️ High temperature!</p>}
        {sensorData.humidity < 20 && <p>⚠️ Humidity too low!</p>}
        {sensorData.light > 800 && <p>☀️ Too much light!</p>}
      </div>
    </div>
  );
}

export default Home;
