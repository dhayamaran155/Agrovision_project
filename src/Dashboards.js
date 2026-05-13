// src/pages/Dashboard.js
import React, { useState, useEffect } from "react";
import { useLanguage } from "./LanguageContext";
import { useAuth } from "./AuthContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const translations = {
  en: {
    dashboard: 'Dashboard',
    soilMoisture: 'Soil Moisture',
    temperature: 'Temperature',
    humidity: 'Humidity',
    soilTooDry: 'Soil too dry',
    highTemperature: 'High temperature',
    humidityTooLow: 'Humidity too low',
  },
  ta: {
    dashboard: 'டாஷ்போர்டு',
    soilMoisture: 'மண் ஈரப்பதம்',
    temperature: 'வெப்பநிலை',
    humidity: 'ஈரப்பதம்',
    soilTooDry: 'மண் மிகவும் வறண்டு உள்ளது',
    highTemperature: 'அதிக வெப்பநிலை',
    humidityTooLow: 'ஈரப்பதம் குறைவு',
  },
};

function Dashboard() {
  const { language, toggleLanguage } = useLanguage();

  const [sensorData, setSensorData] = useState({
    soil_moisture: 0,
    temperature: 0,
    humidity: 0,
  });

  const [chartData, setChartData] = useState({
    labels: [],
    soilMoisture: [],
    temperature: [],
    humidity: [],
  });

  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = "/login";
    }
  }, [isLoggedIn]);

  // Fetch sensor data from Django API
  const fetchSensorData = async () => {
    try {
      const response = await fetch("http://192.168.63.95:8000/api/sensor-data/");
      const data = await response.json();

      const timestamp = new Date().toLocaleTimeString();

     const latest = data[0]; // 🔥 first item eduthu

    setSensorData({
  soil_moisture: latest.soil_moisture,
  temperature: latest.temperature,
  humidity: latest.humidity,
});

      setChartData(prevData => {
  const newLabels = [...prevData.labels, timestamp].slice(-20);

  const newSoilMoisture = [...prevData.soilMoisture, latest.soil_moisture].slice(-20);
  const newTemperature = [...prevData.temperature, latest.temperature].slice(-20);
  const newHumidity = [...prevData.humidity, latest.humidity].slice(-20);

  return {
    labels: newLabels,
    soilMoisture: newSoilMoisture,
    temperature: newTemperature,
    humidity: newHumidity,
  };
});

    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {

    fetchSensorData();

    const interval = setInterval(() => {
      fetchSensorData();
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  const soilMoistureOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${translations[language].soilMoisture} Over Time`,
      },
    },
  };

  const temperatureOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${translations[language].temperature} Over Time`,
      },
    },
  };

  const humidityOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${translations[language].humidity} Over Time`,
      },
    },
  };

  const soilMoistureData = {
    labels: chartData.labels,
    datasets: [
      {
        label: `${translations[language].soilMoisture} (%)`,
        data: chartData.soilMoisture,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const temperatureData = {
    labels: chartData.labels,
    datasets: [
      {
        label: `${translations[language].temperature} (°C)`,
        data: chartData.temperature,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const humidityData = {
    labels: chartData.labels,
    datasets: [
      {
        label: `${translations[language].humidity} (%)`,
        data: chartData.humidity,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="app-container">
      <div className="header">
        <div className="logo">🌱</div>
        <div className="title">AgroVision {translations[language].dashboard}</div>
        <button className="toggle-btn" onClick={toggleLanguage}>
          {language === 'en' ? 'தமிழ்' : 'English'}
        </button>
      </div>

      <div className="card-container">
        <div className="card soil-moisture">
          <h3>{translations[language].soilMoisture}</h3>
          <p>{sensorData.soil_moisture}%</p>
        </div>

        <div className="card temperature">
          <h3>{translations[language].temperature}</h3>
          <p>{sensorData.temperature} °C</p>
        </div>

        <div className="card humidity">
          <h3>{translations[language].humidity}</h3>
          <p>{sensorData.humidity}%</p>
        </div>
      </div>

      <div className="alert-box">
        {sensorData.soil_moisture < 30 && <p>⚠️ {translations[language].soilTooDry}!</p>}
        {sensorData.temperature > 38 && <p>⚠️ {translations[language].highTemperature}!</p>}
        {sensorData.humidity < 20 && <p>⚠️ {translations[language].humidityTooLow}!</p>}
      </div>

      <div className="charts-container">
        <div className="chart">
          <Line options={soilMoistureOptions} data={soilMoistureData} />
        </div>
        <div className="chart">
          <Line options={temperatureOptions} data={temperatureData} />
        </div>
        <div className="chart">
          <Line options={humidityOptions} data={humidityData} />
        </div>
      </div>

    </div>
  );
}



export default Dashboard;