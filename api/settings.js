const router = require('express').Router()

// Settings
router.get('/', function(req, res) {
  // get all settings
})

router.get('/:id', function(req, res) {
  // returns value for specific setting
})

router.put('/:id', function(req, res) {
  // set just one setting
})

router.put('/', function(req, res) {
  // replaces whole setting object
})

module.exports = router
