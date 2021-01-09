const http = require('http')
const express = require('express')
const app = express()

let data = require('./names.json')

// root
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

// names data
app.get('/api/names', (req, res) => {
    res.json(data['names'])
})

// a given name
// TODO: name to lowercase? .toLowerCase()
app.get('/api/names/:name', (request, response) => {
    const name = request.params.name
    const found_person = data['names'].find(
        found_person => found_person.name === name)
    response.json(found_person)
  })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})