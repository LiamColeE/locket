#!/usr/bin/env node

const fs = require('fs')
const com = require('commander')
const defaults = require('object.defaults')

var cwd
if (process.pkg) {
  cwd = path.dirname(process.execPath)
} else {
  cwd = process.cwd()
}

com
  .version(require('package.json').version)
  .option(
    '-c, --config-file <path>',
    'Location of the config file [./config.json].'
  )
  .option('--cert <path>', 'Location of the HTTPS certificate.')
  .option('--key <path>', 'Location of the HTTPS key.')
  .option('-s, --https', 'Enable HTTPS. Disables insecure HTTP.')
  .option('-d, --data <path>', 'Location of the data file.')
  .option('-p, --port <port>', 'Which port to start server on.')
  .parse(process.argv)
  .command('export <in> <out>')
  .description('Exports your data file as a JSON file.')

var config = {
  useHTTPS: !!com.https,
  certPath: com.cert ? path.resolve(cwd, com.cert) : undefined,
  keyPath: com.key ? path.resolve(cwd, com.key) : undefined,
  dataPath: com.data ? path.resolve(cwd, com.data) : undefined,
  configFile: com.configFile ? path.resolve(cwd, com.configFile) : undefined,
  port: com.port
    ? parseInt(com.port) === NaN ? undefined : parseInt(com.port)
    : undefined
}
var configDefaults = {
  useHTTPS: false,
  dataFile: path.resolve(cwd, '/data.locket'),
  configFile: path.resolve(cwd, '/config.js'),
  port: 8080
}

defaults(config, {
  configFile: configDefaults.configFile
})

////
// Config
////
try {
  var tempConfig = JSON.parse(
    fs.readFileSync(config.configFile, { encoding: 'utf8' })
  )
  Object.assign(tempConfig, config)
  config = tempConfig
} catch (error) {
  console.info(
    'Either there is no config file or something went wrong getting it.'
  )
  console.error(error)
}

defaults(config, configDefaults)

module.exports = config
