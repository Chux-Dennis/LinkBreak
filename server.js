const express = require("express");
const app = express();
const mongoose = require("mo");
const mhash = require("murmurhash-js");

const seed = 0;
const input = "Dennis256";
const output = mhash.murmur3(input, seed);
console.log(input, output);

function trueTest(str, hstr) {
  const hashedString = mhash.murmur3(str, 0);
  if (hashedString === hstr) {
    console.log("MurmurHash is suitable for hashing");
  } else {
    console.log("MurmurHash is not suitable for hashing");
  }
}

trueTest("Dennis256", 1570584766);

let PORT = 3000;
app.listen(PORT, console.log(`Server is running on ${PORT}`));
