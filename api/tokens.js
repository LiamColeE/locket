const router = require('express').Router()

// Tokens
router.get('/', function(req, res) {
  // show all authorized tokens
  // make default to just get names, add a parameter to get all the info
})
router.get('/:id', function(req, res) {
  // get info on the one token
})
router.post('/', function(req, res) {
  // add an authorized token
})
router.delete('/:id', function(req, res) {
  // remove token access
})

module.exports = router
