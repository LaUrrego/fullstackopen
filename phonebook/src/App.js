import {useState} from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'

const App = ()=> {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState('')

  const submitHandle = (event) => {
    
    event.preventDefault()
    /* some on an array takes a callback, and use it to 
    check the object for a value  */
    if (persons.some(x => x.name === newName) ){
      alert(`${newName} was already entered!`)
    } else {
    const nameObject = {
      name: newName,
      number: newPhone,
      id: persons.length + 1
    }
    console.log("new name object", nameObject)
    setPersons(persons.concat(nameObject))
    setNewName("")
    setNewPhone("")
  }
  }

  const filterAction = () => {
    if (filterName === "") {
      return persons
    } else {
      /** filter by elements in name that contain characters in filter
       *  convert both to lowercase to make it case insensitive
       */
      return persons.filter(e => e.name.toLowerCase().includes(filterName.toLowerCase()) )
    }
  }

  const updateName = (event) => {
    setNewName(event.target.value)
  }
  const updatePhone = (event) => {
    setNewPhone(event.target.value)
  }

  const updateFilter = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={updateFilter} value={filterName} />
      <h2>Add New</h2>
      <Form nameVal={newName} nameHandle={updateName} numVal={newPhone} numHandle={updatePhone} submitHandle={submitHandle} />
      <h2>Numbers</h2>
      <Persons persons={filterAction()} />
    </div>
  );
}

export default App;
