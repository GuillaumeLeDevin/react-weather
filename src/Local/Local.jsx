export default function Local({weatherData}) {
  return (
    <div>
        <p className="city-name">{weatherData.city}</p>
        <p className="country-name">{weatherData.country}</p>
        <p className="temperature">{weatherData.temperature}°</p>
        <div className="info-icon-container">
            <img
                className="info-icon"
                src={`./icons/${weatherData.iconId}.svg`} alt="" />
        </div>
    </div>
  )
}