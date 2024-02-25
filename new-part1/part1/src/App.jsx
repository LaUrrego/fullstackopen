import { useState } from "react"

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("Enter a new note...")
  const [importance, setImportance] = useState(false)
  const [importantFilter, setImportantFilter] = useState(false)

  // add a new note
  const addNote = (e)=> {
    e.preventDefault()
    console.log('button clicked: ', e)
    
    
    let noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: importance
    }
    console.log(noteObject)

    setNotes(notes.concat(noteObject))
    setImportance(false)
  };

  // note update function
  const updateNote = (e)=>{
    setNewNote(e.target.value)
  };

  // keeps track of the notes array we will show depending on importance filter
  const notesToShow = importantFilter
    ? notes.filter(note => note.important == true) 
    : notes

  return(
    <div>
      <h1>Notes</h1>
      <button onClick={()=>setImportantFilter(!importantFilter)} >{importantFilter ? "Show All Notes" : "Show Important Notes"}</button>
      <ul>
        {notesToShow.map(note => 
          <li key={note.id}>{note.content}</li>
          )}
      </ul>
      <form onSubmit={addNote} >
        <input
        value={newNote}
        onChange={updateNote}
        onClick={()=> setNewNote("")}
        id="content"
        />
        <input type="radio" checked={importance} onClick={()=>setImportance(true)}/>Important?
        {" "}
        <button type="submit">save</button>
      </form>
    </div>
  )
}


export default App
// npm run dev