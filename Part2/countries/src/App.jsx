import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import CountryDetails from './components/CountryDetails'



function App() {
  const [filterValue, setFilterValue]= useState("enter a filter")
  const [countries, setCountries] = useState([]);
  const [countriesShown, setCountriesShown] = useState(null)
  


  const handleFilterValue = (e)=> {
    setFilterValue(e.target.value)  
  }

useEffect(() => {
  axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(response => {
      setCountries(response.data);
    })
    .catch(error => {
      console.error("Error fetching countries data:", error);
    });
}, []);





const handleShowClick = (country) => {
  console.log(country);
  setCountriesShown(
    <div>
      <CountryDetails country ={country} />
    </div>
  );
};


const CountriesList = countries
  .filter(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase()))
  .map(country => <li key={country.cca3}>{country.name.common}<button onClick={()=>handleShowClick(country)}>show</button></li> );


  useEffect(() => {
    if (CountriesList.length < 10 && CountriesList.length > 1) {
      setCountriesShown(<ul>{CountriesList}</ul>);
    } else if (CountriesList.length === 1) {
      const country = countries.find(country => country.name.common.toLowerCase().includes(filterValue.toLowerCase()));
      setCountriesShown(
       <CountryDetails country={country} />
      );
    } else {
      setCountriesShown("Too many matches, specify another filter");
    }
  }, [filterValue, countries]);


  return (
    <>
      <div>
      <p>find countries <input value={filterValue} onChange={handleFilterValue}/></p>

      {countriesShown}
     
       </div>
       <p></p>
    </>
  )
}

export default App
