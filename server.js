const app = require('express')()
const bodyParser = require('body-parser')
const config = require('./config')
const fs = require('fs')
const api = require('./api/')
const data = require('./data')
const crypto = require('./crypto')
const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(bodyParser.json())

// Web App
app.get('/', function(req, res) {
  res.send('This will someday be a little Vue app.')
})

// use api routes
app.use(
  '/api',
  function(req, res, next) {
    if (
      data.data.tokens.current.includes(req.cookies.token) ||
      (!data.data.pass_hash &&
        req.body.passHash === crypto.hashPass(config.tempPass)) ||
      (data.data.pass_hash && data.data.pass_hash === req.body.passHash)
    ) {
      next()
    } else {
      res.status(401).send()
    }
  },
  api
)

////
// start!
////
app.listen(config.port, function() {
  console.info(`Listening on port ${config.port}`)
})
