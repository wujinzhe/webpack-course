define(function(require, exports, module) {
  var util = require('./util.js')
  console.log('util', util)
  var counter = function(val) {
    return util.add(val)
  } 
  return counter
})