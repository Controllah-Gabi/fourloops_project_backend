const cookieParser = require("cookie-parser");
const { postUser } = require("./controllers/signUp.controller");
const { signin } = require("./controllers/signIn.controller");
const { signout } = require("./controllers/signout.controller");
const {changePassword} = require("./controllers/change-password.controller");
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
app.use(cookieParser());

//post
app.post("/api/register-user", postUser);
app.post("/api/signin", signin);
app.post("/api/signout", signout);
app.post("/api/change-password", changePassword);
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
