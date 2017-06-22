const config = require('./config')
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const msgpack = require('msgpack-lite')

exports.data = msgpack.decode(fs.readFileSync(config.dataPath))

exports.propertyExists = function(obj, nesting) {
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

exports.saveToDisk = function() {
  return fs.writeFileAsync(config.dataPath, msgpack.encode(exports.data))
}
