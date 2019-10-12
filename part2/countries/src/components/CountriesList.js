import React from 'react';

const CountriesList = ( {countriesToShow} ) => 
  {
    if (countriesToShow.length > 10){
      return (
        <>
        Too many matches, specify another filter
        </>
      )
    } else if (countriesToShow.length > 1){
      return(
        countriesToShow.map( (country, index) =>    <p key={index}>{country.name}</p> ) 
      )
    }
    
  }
  
  
  
  
  
export default CountriesList