const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mhash = require("murmurhash-js");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const seed = 0;
const input = "Dennis256";
const output = mhash.murmur3(input, seed);
console.log(input, output);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/hero-form", (req, res) => {
  console.log(req.body);
});
let PORT = 3000;
app.listen(PORT, console.log(`Server is running on ${PORT}`));
