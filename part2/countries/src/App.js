import React, {useState, useEffect} from 'react';
import axios from 'axios'

import CountriesList from './components/CountriesList'
import Country from './components/Country'


const App = () => {
  const [ countryToFind, setCountryToFind] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState([])
  
  
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
    
    setShowCountries(countriesToShow)
  }
  
 
  const showInfo = () => {
    console.log('show info ', showCountries.length);
    if (showCountries.length === 1){
      return (
        <Country country={showCountries[0]} />
      )
      
    } else if (showCountries.length > 1) {
      return (
        <CountriesList countriesToShow={showCountries} />
      )
    }
  }

  return(
    <div>
      find countries <input 
        value={countryToFind}
        onChange={handleCountryInput}/>
      
      <div>
        
        {showInfo()}
      </div>
      
      
    </div>
  )

}

export default App;
