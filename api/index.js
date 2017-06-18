const router = require('express').Router()

const accounts = require('./accounts.js')
const settings = require('./settings.js')
const tokens = require('./tokens.js')

router.use('/accounts', accounts)
router.use('/settings', settings)
router.use('/tokens', tokens)

module.exports = router
