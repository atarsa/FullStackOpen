import React, { useState, useEffect } from 'react'
import personService from './services/persons'

import Entries from './components/Entries'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredName, setFilteredName ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  
  useEffect(() => {
    personService
      .getAll()
      .then( initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  
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
      const confirmed = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
      if (confirmed){
        // update existing record
        const person = persons.find(p => p.name === newName.trim())

        const updatedPerson = { ...person, number:newNumber.trim()}

        personService
          .update(person.id, updatedPerson)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            })
      }
      
    } else {
      // add new name
      const nameObject = {
        name: newName.trim(),
        number: newNumber.trim()
      }
      
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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
        setPersons={setPersons}         
      />

    </div>
  )
}

export default App