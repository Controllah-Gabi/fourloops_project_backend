const postUser = require('./controllers/user.controller')
const express = require("express");
const app = express();
app.use(express.json());

app.post('/api/users', () => postUser);

module.exports = app;