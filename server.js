const app = require('express')()
const config = require('./config')
const fs = require('fs')
const api = require('./api/')

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

////
// functions
////
function propertyExists(obj, nesting) {
  for (var i = 0; i < nesting.length; i++) {
    if (!obj || !obj.hasOwnProperty(nesting[i])) {
      return {
        name: nesting[i],
        index: i
      } // returns where things stopped being found
    }
    obj = obj[nesting[i]]
  }
  return true
}
