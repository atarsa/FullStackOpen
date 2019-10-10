import React, { useState } from 'react'
import Entry from './components/Entry'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredName, setFilteredName] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  
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

  const rows = () =>     
    entriesToShow.map(entry => 
        <Entry 
          key={entry.id}
          person={entry}
        />
    )
       

  return (
    <div>
      <h2>Phonebook</h2>
      <div>Filter shown with:
        <input 
          value={filteredName}
          onChange={handleFilterEntry}/>
      </div>
      <h3>add a new entry</h3>
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