import {useState, useEffect} from 'react'
import Note from './components/Note';
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
        .get('http://localhost:3001/notes')
        .then(response => {
          console.log("promise fulfilled")
          setNotes(response.data)
        })
  }, [])
  console.log('render', notes.length, 'notes')

  const notesToShow = showAll 
      ? notes 
      : notes.filter(note => note.important === true)

  const addNote = (event) => {
    event.preventDefault()
    
    const noteObject = {
      important: Math.random() < 0.5,
      content: newNote,
      id: notes.length + 1
    }

    setNotes(notes.concat(noteObject))
    /*returns the placeholder to default */
    setNewNote("a new note...")
    console.log(notes)
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={()=>setShowAll(!showAll)}>
          Show {showAll ? 'Important' : "All"}
        </button>
      </div>
      <ul>
        {notesToShow.map( note =>
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