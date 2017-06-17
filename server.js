const app = require('express')()
const config = require('./config')

// Web App
app.get('/', function(req, res) {
  res.send('This will someday be a little Vue app.')
})

// Accounts
app.get('/api/accounts/:id', function(req, res) {
  // get information for one account
})
app.post('/api/accounts', function(req, res) {
  // add a new account to track
})
app.get('/api/accounts', function(req, res) {
  // get all the accounts
  // make default to just get names, add a parameter to get all the info
})
app.delete('/api/accounts/:id', function(req, res) {
  // delete account info
})

// Settings
app.get('/api/settings', function(req, res) {
  // get all settings
})
app.get('/api/settings/:id', function(req, res) {
  // returns value for specific setting
})
app.put('/api/settings/:id', function(req, res) {
  // set just one setting
})
app.put('/api/settings', function(req, res) {
  // replaces whole setting object
})

// Tokens
app.get('/api/tokens', function(req, res) {
  // show all authorized tokens
  // make default to just get names, add a parameter to get all the info
})
app.get('api/tokens/:id', function(req, res) {
  // get info on the one token
})
app.post('/api/tokens', function(req, res) {
  // add an authorized token
})
app.delete('/api/tokens/:id', function(req, res) {
  // remove token access
})

////
// start!
////
app.listen(3000, function() {
  console.info('Listening...')
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
