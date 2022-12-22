const { postUser } = require('./controllers/userController')
const express = require("express");
const app = express();

//Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.post('/api/users', postUser);

module.exports = app;