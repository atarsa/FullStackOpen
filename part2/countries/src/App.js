import React, {useState, useEffect} from 'react';
import axios from 'axios'


const App = () => {
  const [ countryToFind, setCountryToFind] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState([])

  const rows = (countriesToShow) => {

    if (countriesToShow.length > 10) {
      return <>
        Too many matches, specify another filter
        </>
    } else if (countriesToShow.length === 1){
      
      const country = countriesToShow[0]
      
      const showLanguages = () => country.languages.map((language, i) => <li key={i}> {language.name}</li>)
      
      // show country info
      return (
        <>
          <h3>{country.name}</h3>
          <div>Capital: {country.capital}</div>
          <div>Population: {country.population}</div>
          <h4>Languages</h4>
          <ul>
            {showLanguages()}
          </ul>
          <img src={country.flag} alt='flag'  height="100" width="100"></img>
        </>
      )

    } else {
      
      return (
        countriesToShow.map( (country, index) => <p key={index}>{country.name} </p>)     
      )
    }
    
  }
    
  

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(respone => {
        console.log('promise fulfilled')
        setCountries(respone.data)
        
      })
  }

  useEffect(hook, [])
  console.log('render', countries.length, 'countries')

  const handleCountryInput = (event) => {
    console.log(event.target.value);
    setCountryToFind(event.target.value)

    const countriesToShow = 
      countries.filter(country => (
        country.name.toLowerCase().indexOf(countryToFind.toLowerCase()) !== -1
      ))
    
    setShowCountry(countriesToShow)
  }

  return(
    <div>
      find countries <input 
        value={countryToFind}
        onChange={handleCountryInput}/>
      <div>
        {rows(showCountry)}
      </div>
    </div>
  )

}

export default App;
