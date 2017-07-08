const ts = require('triplesec')
const crypto = require('crypto')

exports.hashPass = function hashPass(pass) {
  return new ts.hash.SHA512()
    .update(new ts.WordArray.from_utf8(pass))
    .finalize()
    .to_hex()
}

exports.genToken = function genToken(){
  return crypto.randomBytes(64).toString('base64')
}