const { postUser } = require("./controllers/userController");
const express = require("express");
const { postPost, getAllPosts, getPostByID } = require("./controllers/postController");
const { postCode, getAllCodes, getCodeByID } = require("./controllers/codeController");
const app = express();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//post
app.post("/api/users", postUser);
app.post("/api/posts", postPost);
app.post("/api/codes", postCode);

//get
app.get("/api/posts", getAllPosts);
app.get("/api/codes", getAllCodes);
app.get("/api/posts/:post_id", getPostByID);
app.get("/api/codes/:code_id", getCodeByID);

module.exports = app;
