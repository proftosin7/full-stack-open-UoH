import WeatherDetails from './WeatherDetails'

import { useState,useEffect } from 'react';
import axios from 'axios';


const CountryDetails = ({country}) => {
    const [weatherDetails, setWeatherDetails] = useState(null);
   
    useEffect(() => {
        const fetchWeatherDetails = () => {
          const API_key = import.meta.env.VITE_SOME_KEY;
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${API_key}`;
         
          axios.get(url)
            .then(response => {
              
              setWeatherDetails(response.data);
            })
            .catch(error => {
              console.error("Error fetching weather data:", error);
            });
        };
      
        fetchWeatherDetails();
      }, [country]);


    return (
      <>
       <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <p>Population: {country.population}</p>
        <p>Languages: {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}</p>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="100" />
        <p>Weather in {country.capital}</p>
        <WeatherDetails weatherDetails= {weatherDetails}/>
      </div>
      </>
    )
  }

export default CountryDetails