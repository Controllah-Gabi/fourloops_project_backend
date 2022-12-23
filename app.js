const { postUser } = require("./controllers/userController");
const express = require("express");
const { postPost, getAllPosts } = require("./controllers/postController");
const { postCode, getAllCodes } = require("./controllers/codeController");
const app = express();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/users", postUser);
app.post("/api/posts", postPost);
app.post("/api/codes", postCode);

app.get("/api/posts", getAllPosts);
app.get("/api/codes", getAllCodes);

module.exports = app;
