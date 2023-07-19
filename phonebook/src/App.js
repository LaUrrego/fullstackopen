import {useState} from 'react'

const App = ()=> {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])

  const [newName, setNewName] = useState('')

  const submitHandle = (event) => {
    
    event.preventDefault()
    /* some on an array takes a callback, and use it to 
    check the object for a value  */
    if (persons.some(x => x.name === newName) ){
      alert(`${newName} was already entered!`)
    } else {
    const nameObject = {
      name: newName
    }
    console.log("new name object", nameObject)
    setPersons(persons.concat(nameObject))
  }
  }

  const updateName = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={updateName}/>
        </div>
        <div>
          <button type="submit" onClick={submitHandle}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <div key={person.name}>{person.name}</div>)}
      </div>
      
    </div>
  );
}

export default App;
