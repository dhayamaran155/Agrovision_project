import React, { useState } from 'react';
import './yield_prediction.css';
import { useLanguage } from './LanguageContext';

const YieldPrediction = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    soilType: '',
    cropType: '',
    temperature: '',
    rainfall: '',
    humidity: '',
    landArea: ''
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Base prediction logic for demonstration
    const baseYield = 450;
    const area = parseFloat(formData.landArea) || 1;
    const multiplier = 1 + (Math.random() * 0.4 - 0.2); // +/- 20% random variance
    const calculatedYield = (baseYield * area * multiplier).toFixed(2);
    setPrediction(calculatedYield);
  };

  return (
    <div className="yield-container">
      <div className="yield-header-container">
        <div className="yield-header">
          <h1>{t.yieldPrediction.title}</h1>
          <p>{t.yieldPrediction.description}</p>
        </div>
        <button className="language-switch-btn" onClick={toggleLanguage}>
          {language === 'en' ? 'தமிழ்' : 'English'}
        </button>
      </div>

      <div className="yield-content">
        <div className="form-section">
          <form className="yield-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="soilType">{t.yieldPrediction.soilType}</label>
                <select name="soilType" id="soilType" value={formData.soilType} onChange={handleChange} required>
                  <option value="">{t.common.selectOption}</option>
                  <option value="clay">{t.yieldPrediction.soilOptions.clay}</option>
                  <option value="sandy">{t.yieldPrediction.soilOptions.sandy}</option>
                  <option value="loamy">{t.yieldPrediction.soilOptions.loamy}</option>
                  <option value="silt">{t.yieldPrediction.soilOptions.silt}</option>
                  <option value="peaty">{t.yieldPrediction.soilOptions.peaty}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cropType">{t.yieldPrediction.cropType}</label>
                <select name="cropType" id="cropType" value={formData.cropType} onChange={handleChange} required>
                  <option value="">{t.common.selectOption}</option>
                  <option value="wheat">{t.yieldPrediction.cropOptions.wheat}</option>
                  <option value="rice">{t.yieldPrediction.cropOptions.rice}</option>
                  <option value="corn">{t.yieldPrediction.cropOptions.corn}</option>
                  <option value="cotton">{t.yieldPrediction.cropOptions.cotton}</option>
                  <option value="sugarcane">{t.yieldPrediction.cropOptions.sugarcane}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="temperature">{t.yieldPrediction.temperature}</label>
                <input type="number" step="0.1" name="temperature" id="temperature" placeholder="e.g. 25.5" value={formData.temperature} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="rainfall">{t.yieldPrediction.rainfall}</label>
                <input type="number" step="0.1" name="rainfall" id="rainfall" placeholder="e.g. 150" value={formData.rainfall} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="humidity">{t.yieldPrediction.humidity}</label>
                <input type="number" step="0.1" name="humidity" id="humidity" placeholder="e.g. 60.5" value={formData.humidity} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="landArea">{t.yieldPrediction.landArea}</label>
                <input type="number" step="0.1" name="landArea" id="landArea" placeholder="e.g. 5" value={formData.landArea} onChange={handleChange} required />
              </div>
            </div>

            <button type="submit" className="submit-btn" aria-label="predict-yield">{t.common.predictYield}</button>
          </form>
        </div>

        <div className="result-section">
          <div className={`result-card ${prediction ? 'active' : ''}`}>
            {prediction ? (
              <>
                <div className="result-icon">🌾</div>
                <h3>{t.yieldPrediction.estimatedYield}</h3>
                <div className="result-value">{prediction} <span>{t.yieldPrediction.quintals}</span></div>
                <p className="result-desc">{t.yieldPrediction.resultDesc}</p>
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-icon">📊</div>
                <p>{t.yieldPrediction.emptyStateDesc}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;
