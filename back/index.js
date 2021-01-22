const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

let data = require('./names.json')

// root
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

// names data
app.get('/api/names', (req, res) => {
    console.log('sending data')
    res.json(data['names'])
})

// a given name
app.get('/api/names/:name', (request, response) => {
    const name = request.params.name
    console.log('sending person')
    const found_person = data['names'].find(
        found_person => found_person.name === name)
    response.json(found_person)
  })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})