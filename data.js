const config = require('./config')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const msgpack = require('msgpack-lite')

exports.propertyExists = function propertyExists(obj, nesting) {
  let placeholderObj = obj
  for (let i = 0; i < nesting.length; i++) {
    if (!placeholderObj || !placeholderObj.hasOwnProperty(nesting[i])) {
      return {
        name: nesting[i],
        index: i
      } // returns where things stopped being found
    }
    placeholderObj = placeholderObj[nesting[i]]
  }
  return true
}

exports.saveToDisk = function saveToDisk() {
  fs.writeFileSync(config.dataPath, msgpack.encode(exports.data))
}

exports.checkTokenTimes = function checkTokenTimes() {
  exports.data.tokens.current = exports.data.tokens.current.filter(function(
    token
  ) {
    let now = new Date()
    let expireTime = new Date(token.expire_time)

    return expireTime - now >= 0
  })
}

exports.data = (function() {
  let res
  try {
    res = msgpack.decode(fs.readFileSync(config.dataPath))
    return res
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.info(
        `Data file at ${config.dataPath} not found. Creating a default one.`
      )
      res = {
        accounts: [],
        next_account_id: 0,
        next_token_id: 0,
        pass_hash: null,
        tokens: {
          revoked: [],
          current: []
        },
        settings: {
          password_timeout: 3600, // time in seconds before password re-prompt (1 hour)
          never_prompt_list: [],
          prompt_to_save: true
        }
      }
      exports.data = res
      exports.saveToDisk()
      return res
    } else {
      console.info('Issue loading data file.')
      console.error(error)
    }
  }
})()
