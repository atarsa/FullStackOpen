import React from 'react'



const Country = ( {country} ) => {
  const showLanguages = () => country.languages.map((language, i) =>  <li key={i}> {language.name}</li>
  )
      
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
}
      
export default Country