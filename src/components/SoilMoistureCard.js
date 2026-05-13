import React from 'react';

function SoilMoistureCard({ soilMoisture }) {
  return (
    <div className="card">
      <h3>Soil Moisture</h3>
      <p>{soilMoisture}%</p>
    </div>
  );
}

export default SoilMoistureCard;