const Str = require('@supercharge/strings')

/**
 * 
 * @param {*} length 
 */
const generateRandomString = function(length){
  return Str.random(length);
}

module.exports = { generateRandomString }