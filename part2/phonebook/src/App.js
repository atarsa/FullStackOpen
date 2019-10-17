import React, { useState, useEffect } from 'react'
import personService from './services/persons'

import Entries from './components/Entries'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredName, setFilteredName ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ msg, setMessage] = useState('')
  const [ msgClasses, setMsgClasses ] = useState('')
  
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

              setMessage(`${person.name}'s number was updated.`)
              setMsgClasses('notification successful')
            })
            .catch(error => {
              setMessage(`Information of ${person.name} has already been removed from server`)
              setMsgClasses('notification error')
            })
                
        setTimeout(() => {
          setMessage(null)
          setMsgClasses('')
        },5000)
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

          setMessage(`Added ${newName} `)
          setMsgClasses('notification successful')
          setTimeout(() => {
            setMessage(null)
            setMsgClasses('')
          },5000)
        })
        .catch(error => {
          setMessage(error.response.data.error)
          setMsgClasses('notification error')
          setTimeout(() => {
            setMessage(null)
            setMsgClasses('')
          },5000)
        })    
    }
  } 
       
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={msg}
        className={msgClasses}

      />
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