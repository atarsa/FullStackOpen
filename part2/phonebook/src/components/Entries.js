import React from 'react';
import Entry from './Entry'
import personService from './../services/persons'


const Entries = ({entriesToShow, setPersons}) => {
  
  const deleteEntry = id => {
    const entry = entriesToShow.find(e => e.id === id)
    const result = window.confirm(`Delete ${entry.name}?`)

    if (result){
      personService
        .deleteEntry(id)
        .then(response => {
          setPersons(entriesToShow.filter(e => e.id !== id))
        })
    }
  }

  return (
    entriesToShow.map(entry => 
      <Entry 
        key={entry.id}
        entry={entry}
        deleteEntry={() => deleteEntry(entry.id)}
      />
    )
  )
  
}


  


export default Entries