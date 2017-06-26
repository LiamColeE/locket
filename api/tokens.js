const router = require('express').Router()

router.get('/', function(req, res) {
  // get all token data
})

router.post('/', function(req, res) {
  // get a new token with the name that was passed in
})

router.get('/revoked', function(req, res) {
  // return the tokens that were manually revoked by the user
})

module.exports = router
