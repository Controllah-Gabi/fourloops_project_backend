const { postUser } = require("./controllers/userController");
const express = require("express");
const {
  addPost,
  getAllPosts,
  getPostByID,
  deletePost,
} = require("./controllers/postController");
const {
  postCode,
  getAllCodes,
  getCodeByID,
  deleteCode,
} = require("./controllers/codeController");
const app = express();

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//post
app.post("/api/users", postUser);
app.post("/api/posts", addPost);
app.post("/api/codes", postCode);

//get
app.get("/api/posts", getAllPosts);
app.get("/api/codes", getAllCodes);
app.get("/api/posts/:post_id", getPostByID);
app.get("/api/codes/:code_id", getCodeByID);
//app.get("/api/users/:user_id", ...);

//delete
app.delete("/api/posts/:post_id", deletePost);
app.delete("/api/codes/:code_id", deleteCode);

//patch

module.exports = app;
