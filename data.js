const fs = require('fs')
const config = require('./config')
const promise = require('bluebird')

exports.data = {}

exports.propertyExists = function(obj, nesting) {
  for (var i = 0; i < nesting.length; i++) {
    if (!obj || !obj.hasOwnProperty(nesting[i])) {
      return {
        name: nesting[i],
        index: i
      } // returns where things stopped being found
    }
    obj = obj[nesting[i]]
  }
  return true
}

exports.saveToDisk = function() {
  fs.write
}
