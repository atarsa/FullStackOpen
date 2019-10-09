import React, { useState } from 'react'
import Entry from './components/Entry'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = event => setNewNumber(event.target.value)

  const addEntry = (event) => {
    event.preventDefault()
   
    // check if name already on the list
    if (persons.some(person => person.name === newName.trim())){
      alert(`${newName} is already added to phonebook`)
      
    } else if (!!newName || !!newNumber )  {  
      alert('Please fill both fields')
    }
      else {
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

  const rows = () =>     
    persons.map(person => 
        <Entry 
          key={person.id}
          person={person}
        />
    )
       

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addEntry}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
            />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {rows()}
      </ul>

    </div>
  )
}

export default App