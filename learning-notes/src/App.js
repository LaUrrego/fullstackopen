import {useState, useEffect} from 'react'
import Note from './components/Note';
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
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
    }

    noteService
      .create(noteObject)
      .then(response => {
        
        setNotes(notes.concat(response))
        console.log(response)
        setNewNote("a new note...")
      })
  }

  const removeNote = (id) => {
    console.log("id from remove:", id)

    noteService
      .remove(id)
      .then(response => console.log("success",response),
      setNotes(notes.filter(n=> n.id != id))
      )
      .catch(error => console.log(error))

    
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id)=>{
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    
    noteService
      .update(id, changedNote)
      .then(response => {
        setNotes(notes.map(n => n.id !== id? n : response))
      })
      .catch(error=>{
        alert(error, `Note: ${note.content} was already deleted from the server!`)
        setNotes(notes.filter(n=> n.id != id))
      })
    
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
          <Note key={note.id} note={note} toggleImportance={()=>toggleImportanceOf(note.id)} remove={()=>removeNote(note.id)}/>
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
