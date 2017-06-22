const fs = require('fs')
const config = require('./config')
const Promise = require('bluebird')

exports.data = {}

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
  fs.write
}
