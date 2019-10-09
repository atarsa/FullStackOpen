import React, { useState } from 'react'
import Entry from './components/Entry'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
   
    // check if name already on the list
    if (persons.some(person => person.name === newName.trim())){
      alert(`${newName} is already added to phonebook`)
      
    } else {
      // add new name
      const nameObject = {
        name: newName.trim(),
        id: persons.length + 1
      }
     
      setPersons(persons.concat(nameObject))
      setNewName('')
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
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
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