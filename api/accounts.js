const router = require('express').Router()
const data = require('../data')
const val = require('../validate')

router.get('/:id/version', function(req, res) {
  let accountData = data.data.accounts.find(function(account) {
    return account.id == req.params.id
  })

  if (accountData === undefined) {
    res.status(404).end()
  } else {
    res.json({
      version: accountData.version
    })
  }
})

router.get('/:id', function(req, res) {
  // get information for one account
  let accountData = data.data.accounts.find(function(account) {
    return account.id == req.params.id
  })

  if (accountData === undefined) {
    res.status(404).end()
  } else {
    res.json(accountData)
  }
})

router.post('/', function(req, res) {
  // add a new account
  let account = val.cleanAttributes(req.body, val.constraints.newAccount)
  let validation = val(account, val.constraints.newAccount)
  if (validation === undefined) {
    account.version = 1
    console.log(data)
    account.id = data.data.next_id++
    data.data.accounts.push(account)
    data.saveToDisk()
    res.status(201).json({
      id: account.id,
      version: account.version
    })
  } else {
    res.status(400).json(validation)
  }
})

router.get('/', function(req, res) {
  // get all the accounts
  // make default to just get names, add a parameter to get all the info
  if (req.query.full == 1) {
    res.json(data.data.accounts)
  } else {
    res.json(
      Array.from(data.data.accounts, account => {
        return {
          id: account.id,
          name: account.name,
          version: account.version
        }
      })
    )
  }
})

router.delete('/:id', function(req, res) {
  // delete account info
  let accountIndex = data.data.accounts.findIndex(account => {
    return account.id == req.params.id
  })

  if (accountIndex === -1) {
    res.status(404).end()
  } else {
    data.data.accounts.splice(accountIndex, 1)
    res.status(204)
  }
  data.saveToDisk()
})

router.post(':id', function(req, res) {
  // update an account and return the new version number
  let clientAccount = val.cleanAttributes(
    req.body,
    val.constraints.updateAccount
  )
  let validation = val(clientAccount, val.constraints.updateAccount)

  if (validation === undefined) {
    let accountIndex = data.data.accounts.findIndex(account => {
      return account.id == req.params.id
    })

    Object.assign(data.data.accounts[accountIndex], clientAccount)
    data.data.accounts[accountIndex].version++
    data.saveToDisk()
    res.json({
      version: data.data.accounts[accountIndex].version
    })
  } else {
    res.status(400).json(validation)
  }
})

module.exports = router
