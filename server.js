const app = require('express')()
const bodyParser = require('body-parser')
const config = require('./config')
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

// Auth
function auth(req, res, next) {
  data.removeExpiredTokens()

  let dat = data.data

  let tokenVal = dat.tokens.current.some(function(token) {
    return token.value === req.cookies.token
  })

  let tempPass =
    !dat.pass_hash && req.body.passHash === crypto.hashPass(config.tempPass)

  let pass = dat.pass_hash && dat.pass_hash === req.body.passHash

  if (tokenVal || tempPass || pass) {
    next()
  } else {
    res.status(401).end()
  }
}

// use api routes
app.use('/api', auth, api)

////
// start!
////
app.listen(config.port, function() {
  console.info(`Listening on port ${config.port}`)
})
