module.exports = {
  propertyExists: function(obj, nesting) {
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
  },
  data: {}
}
