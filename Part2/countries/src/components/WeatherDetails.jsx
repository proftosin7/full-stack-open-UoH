

const WeatherDetails = ({ weatherDetails }) => {
    
  
    return weatherDetails ? (
        <div>
          <p>Temperature: {(weatherDetails.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Weather: {weatherDetails.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${weatherDetails.weather[0].icon}@2x.png`} alt="country flag" />
          <p>Wind Speed: {weatherDetails.wind.speed.toFixed(2)} m/s</p>
        </div>
        ) : (
        <p>Loading weather details...</p>
        );
  };

export default WeatherDetails