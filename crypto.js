const ts = require('triplesec')

exports.hashPass = function hashPass(pass) {
  return new ts.hash.SHA512()
    .update(new ts.WordArray.from_utf8(pass))
    .finalize()
    .to_hex()
}
