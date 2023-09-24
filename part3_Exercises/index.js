const express = require('express')
const app = express()

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())


app.get('/',(request, response) => {
    response.send('<h2>Phonebook Backend Exercises App</h2>')
})

app.get('/api/persons', (request, response)=>{
    response.json(phonebook)
})

app.get('/api/persons/:id', (request, response)=>{
    const id = Number(request.params.id)
    const match = phonebook.find(x => x.id === id)
    if (match){
        response.json(match)
    } else {
        response.status(404).json({error:`id not found`})
    }

})

// id generator using random
const generateID = () => {
    const minimum = phonebook.length > 0 ? Math.max(...phonebook.map(x=>x.id)) : 0
    const maximum = 1000000
    return Math.floor(Math.random() * (maximum - minimum) + minimum) 
}

app.post('/api/persons',(request, response)=>{
    const body = request.body
    // stop if nothing was submitted
    if (!body.name || !body.number){
        return response.status(400).json({error:'no data submitted'})
    }
    // check for duplicate name
    const duplicate = phonebook.find(x=>x.name === body.name)
    
    if(duplicate){
        return response.status(400).json({error: "name must be unique"})
    }
    // object schema
    const entry = {
        id: generateID(),
        name: body.name,
        number: body.number
    }
    // add to phonebook and return the object as confirmation
    phonebook = phonebook.concat(entry)
    response.json(entry)

})

app.delete('/api/persons/:id', (request, response)=>{
    const id = Number(request.params.id)
    phonebook = phonebook.filter(x => x.id != id)
    response.status(204).end()

})

app.get('/info', (request, response)=>{
    const currDate = new Date().toLocaleString()
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    response.send(`
    <p>Phonebook has info for ${phonebook.length} people</p>
    <p>${currDate} ${timeZone}</p>
    `)

})


const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port: ${PORT}`)
})