const express = require("express");
const cors = require("cors");
const app = express();

const wihtelist = [
  "http://localhost:3000",
  "http://localhost:3443",
  "http://localhost:3001",
];
var corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (wihtelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
