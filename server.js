const express = require('express')
const morgan = require('morgan')
const pretty = require('express-prettify')
const cors = require('cors')
const app = express()
const port = 3001
const data = require('./data/packages.json')

// Sort packages by downloads
let sorted = data.content.sort((a, b) => {
  return b.downloads - a.downloads
})

// Logging middleware
app.use(morgan('tiny'))

// Prettyify middleware
// Use ?pretty query string t return pretty json
app.use(pretty({ query: 'pretty' }))

// Enable CORS for all routes
app.use(cors())

// Home
app.get('/', (req, res) => {
  let result = sorted[0]
  return res.json(result)
})

// Get package by index number
app.get('/package/:i(\\d+)', (req, res) => {
  let result = sorted[req.params.i]
  if(result !== undefined) {
    return res.json(result)
  }
  else {
    return res.sendStatus(404)
  }
})

// Get package by _id
app.get('/package/:id', (req, res) => {
  let result = sorted.find(x => x._id == req.params.id)
  if(result !== undefined) {
    return res.json(result)
  }
  else {
    return res.sendStatus(404)
  }
})

// Limit the number of items
app.get('/packages/:start(\\d+)/:limit(\\d+)', (req, res) => {
  let start = parseInt(req.params.start)
  let limit = parseInt(req.params.limit)
  if(limit > 50) {
    limit = 50
  }
  let result = sorted.slice(start, start + limit)
  if(result.length > 0) {
    return res.json(result)
  }
  else {
    return res.sendStatus(404)
  }
})

// Get the raw json
// app.get('/raw', (req, res) => {
//   return res.json(data)
// })

app.listen(port, () => {
  console.log('Listening on port %s', port)
})
