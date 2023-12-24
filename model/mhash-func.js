const mhash = require("murmurhash-js");

const hashFunction = (input) => {
  return mhash(input, 0);
};

module.exports = hashFunction;
