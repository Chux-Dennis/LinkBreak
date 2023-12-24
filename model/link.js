const express = require("express");
const app = express();
const mongoose = require("mongoose");

const linkSchema = mongoose.Schema({
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  redirectUrl: String,
  uniqueID: String,
});

const links = mongoose.model("linksCollection", linkSchema);

module.exports = links;
