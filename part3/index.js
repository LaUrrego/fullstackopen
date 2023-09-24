const express = require('express');
const app = express();

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

app.use(express.json())

// default home message
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

// get request for all resources located in /notes
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

// get individual resource
app.get('/api/notes/:id', (request, response)=>{
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if(note){
    response.json(note)
  } else {
    response.status(404).end()
  }
  
})

// deleted individual resource
app.delete('/api/notes/:id', (request, response)=>{
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

// function to identify the next closest ID number for the object
const generateID = () => {
  // identify the current max id number. If it's empty, it's 0, otherwise it's the max of them
  const maxID = notes.length > 0 
  ? Math.max(...notes.map(n => n.id))
  : 0

  return maxID + 1
}

// post request sent to /notes
app.post('/api/notes', (request, response) => {
    
    const body = request.body

    // ensure that no blank request is sent
    if(!body.content) {
      response.status(400).json({
        error: 'Content Missing'
      })
    }

    // create the note object with default important key. All others in request are dropped
    const note = {
      id: generateID(),
      content: body.content,
      important: body.import || false
    }
    
    notes = notes.concat(note)

    response.json(note)

})

const PORT = 3001
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
