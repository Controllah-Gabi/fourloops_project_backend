const express = require("express");
// const morgan = require('morgan');

const app = express();

// MIDDLEWARES
app.use(express.json());

app.use((req, res, next) => {
    console.log("Hello from the middleware... 👋");
    next();
});


module.exports = app;