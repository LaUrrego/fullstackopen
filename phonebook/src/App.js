import {useState, useEffect} from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'

import services from './services/server'

const App = ()=> {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(()=> {
    services 
      .getAll()
      .then(data => {
        setPersons(data)
      })
      .catch(error => console.log("error", error))
    },[])

  const submitHandle = (event) => {
    
    event.preventDefault()
    
    /* some on an array takes a callback, and use it to 
    check the object for a value  */
    const personExists = persons.find(x => x.name === newName)
  
    if (personExists){

      if (personExists.number === newPhone){
       
        alert(`${newName} was already entered!`);
      
      } else {

        const choice = window.confirm(`${newName} was already entered. Update the old number to ${newPhone}?`)

        if (choice) {
          personExists.number = newPhone
          console.log("updated phone on entry:", personExists)
          services.update(personExists).then(response=>{
            console.log(response);
            setPersons(persons.map(person => person.name === response.name? personExists : person))
            setNewName("");
            setNewPhone("");
          })

        }
      }} else {
    
      const nameObject = {name: newName,number: newPhone}
 
      services
        .addNew(nameObject)
        .then( added => {
          console.log("Success:", added);
          setPersons(persons.concat(added));
          setNewName("");
          setNewPhone("");
        }
 
      )
      .catch(error => console.log("There was an error:", error))
    
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

  const confirmDelete = (person)=> {
    const response = window.confirm(`Delete ${person.name}?`)
    if (response) {
      console.log("confirmed delete")
      services
        .remove(person.id)
        .then(response => console.log("success!", response),
          setPersons(persons.filter(p => p.id !== person.id)))
    } 
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={updateFilter} value={filterName} />
      <h2>Add New</h2>
      <Form nameVal={newName} nameHandle={updateName} numVal={newPhone} numHandle={updatePhone} submitHandle={submitHandle} />
      <h2>Numbers</h2>
      <Persons persons={filterAction()} remHandle={confirmDelete}/>
    </div>
  );
}

export default App;
