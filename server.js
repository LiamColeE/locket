const app = require('express')()
const bodyParser = require('body-parser')
const config = require('./config')
const fs = require('fs')
const api = require('./api/')

app.use(bodyParser.json())

// Web App
app.get('/', function(req, res) {
  res.send('This will someday be a little Vue app.')
})

app.use('/api', api)

////
// start!
////
app.listen(config.port, function() {
  console.info(`Listening on port ${config.port}`)
})
