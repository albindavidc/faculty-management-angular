require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:4200" }));

app.get("/", (req, res) => {
  const data = "this is albin";
  res.send(data);
});

module.exports = app;
