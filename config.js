const fs = require('fs')
const defaults = require('object.defaults')
const configFile = path.dirname(process.execPath) + '/config.json'
var config = {}
var configDefaults = {
  useHTTPS: false,
  dataFile: path.dirname(process.execPath) + '/data.locket'
}

////
// Config
////
var config
try {
  fs.accessSync(configFile)
  config = JSON.parse(fs.readFileSync(configFile, { encoding: 'utf8' }))
} catch (error) {
  console.info('No config found; using defaults...')
}

defaults(config, configDefaults)

module.exports = config
