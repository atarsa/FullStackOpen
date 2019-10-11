import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Entries from './components/Entries'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredName, setFilteredName] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  
  const hook = (() => {
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then( response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    }
      
    )
  })

  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  const entriesToShow = showAll
    ? persons
    : persons.filter( person =>     person.name.toLowerCase().indexOf(filteredName.toLowerCase()) !== -1
    )
  
    // helpers functions
  const handleFilterEntry = event => {
    setFilteredName(event.target.value)
    
    if (filteredName){setShowAll(false)}
    else(setShowAll(true))    
  }

  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = event => setNewNumber(event.target.value)

  const addEntry = (event) => {
    event.preventDefault()
   
    // check if name already on the list
    if (persons.some(person => person.name === newName.trim())){
      alert(`${newName} is already added to phonebook`)
      
    } else {
      // add new name
      const nameObject = {
        name: newName.trim(),
        number: newNumber.trim(),
        id: persons.length + 1
      }
     
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }    
  } 
       
  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter 
        value={filteredName}
        onChange={handleFilterEntry}
      />
      
      <h3>add a new entry</h3>
      <PersonForm 
        onSubmit={addEntry}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <Entries 
        entriesToShow={entriesToShow} 
      />

    </div>
  )
}

export default App