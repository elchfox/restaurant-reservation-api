const express = require('express');
const app = express();
const resevationRoute = require("./reservation");


app.use("/resevation", resevationRoute);


module.exports = app;