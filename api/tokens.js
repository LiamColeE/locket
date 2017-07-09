const router = require('express').Router()
const data = require('../data')
const crypto = require('../crypto')

router.get('/', function(req, res) {
  if (req.query.full == 1) {
    res.json(
      Array.from(data.data.tokens.current, token => {
        token.value = null
        return token
      })
    )
  } else {
    res.json(
      Array.from(data.data.tokens.current, token => {
        return {
          id: token.id,
          name: token.name
        }
      })
    )
  }
})

router.post('/', function(req, res) {
  // get a new token with the name that was passed in
  // TODO all object validation
  let newToken = {
    name: req.body.name,
    id: data.data.next_token_id++,
    issue_time: new Date().toISOString(),
    expire_time: new Date(
      Date.now() + data.data.settings.password_timeout * 1000
    ).toISOString(),
    value: crypto.genToken(),
    creator_ip: req.ip
  }

  data.data.tokens.current.push(newToken)
  data.saveToDisk()

  res.status(201).json({
    id: newToken.id,
    expire_time: newToken.expire_time,
    value: newToken.value
  })
})

router.get('/revoked', function(req, res) {
  // return the tokens that were manually revoked by the user
  res.json(data.data.tokens.revoked)
})

router.delete('/:id', function(req, res) {
  // revoke a token
  let tokenIndex = data.data.tokens.current.findIndex(token => {
    return token.id == req.params.id
  })

  if (tokenIndex === -1) {
    res.status(404).end()
  } else {
    let token = data.data.tokens.current.splice(tokenIndex, 1)[0]
    token.revoked_time = new Date().toISOString()

    data.data.tokens.revoked.push(token)
    data.saveToDisk()
    res.status(204).end()
  }
})

module.exports = router
