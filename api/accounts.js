const router = require('express').Router()

// Accounts
router.get('/:id', function(req, res) {
  // get information for one account
})

router.post('/', function(req, res) {
  // add a new account to track
})

router.get('/', function(req, res) {
  // get all the accounts
  // make default to just get names, add a parameter to get all the info
})

router.delete('/:id', function(req, res) {
  // delete account info
})

module.exports = router
