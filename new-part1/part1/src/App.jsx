import { useState } from "react"

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("Enter a new note...")
  const [importance, setImportance] = useState(false)

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

  }

  const updateNote = (e)=>{
    setNewNote(e.target.value)
  }

  return(
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
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
        <button type="submit">save</button>
      </form>
    </div>
  )
}


export default App
// npm run dev