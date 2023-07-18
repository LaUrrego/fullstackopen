import {useState} from 'react'
import Note from './components/Note';

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')

  const addNote = (event) => {
    event.preventDefault()
    console.log("button clicked", event.target);

    const noteObject = {
      important: Math.random() < 0.5,
      content: newNote,
      id: notes.length + 1
    }

    setNotes(notes.concat(noteObject))
    setNewNote("a new note...")

  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map( note =>
          <Note key={note.id} note={note}/>
          )}
      </ul>
      <form>
        <input value={newNote} onChange={handleNoteChange} onFocus={()=>setNewNote("")}></input>
        <button type="submit" onClick={addNote}>save</button>
      </form>
    </div>
  );
}

export default App;
