require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const adminRoutes = require("./Routes/AdminRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:4200" }));
app.use("admin", adminRoutes);

module.exports = app;
