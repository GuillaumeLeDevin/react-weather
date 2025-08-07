import React from 'react'

export default function Local({ weatherData }) {
  return (
    <>
        
      <p className="city-name">{weatherData.city}</p>
      <p className="country-name">{weatherData.country}</p>
      <p className="temperature">{weatherData.temperature}°</p>
      <div className="info-icon-container">
        <img src={`/icons/${weatherData.iconId}.svg`} className="info-icon" alt="weather icon" />
      </div>
    </>
  )
}
