import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const addNew = (nameObject) => {
    const request = axios.post(baseURL, nameObject)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)

    return request.then(response => response)
}

const update = (person) => {
    console.log("received personObject", person)

    const request = axios.put(`${baseURL}/${person.id}`, person)
    return request.then(response => response.data).catch(response => console.log("ERROR:", response))
}

export default {getAll, addNew, remove, update} 