const Persons = ({persons, remHandle}) => {
    console.log("persons array", persons)

    return(
        <div>
            {persons.map(person => <div key={person.id}>{person.name} {person.number} <button onClick={()=>remHandle(person)}>delete</button></div>)}
        </div>
    )

}

export default Persons