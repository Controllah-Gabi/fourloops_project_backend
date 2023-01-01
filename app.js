const cookieParser = require("cookie-parser");
const { postUser } = require("./controllers/signUp.controller");
const { signin } = require("./controllers/signIn.controller");
const { signout } = require("./controllers/signout.controller");
const {changePassword} = require("./controllers/change-password.controller");
const { addCodeComment, getCodeComments, deleteCodeComment } = require("./controllers/code-comment.controller");
const { addPostComment, getPostComments, deletePostComment } = require("./controllers/post-comment.controller");

const { addPost, getAllPosts, getPostByID, deletePost } = require("./controllers/postController");
const { postCode, getAllCodes, getCodeByID, deleteCode } = require("./controllers/codeController");

const express = require("express");
const app = express();
const cors = require("cors");

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//post
app.post("/api/register-user", postUser);
app.post("/api/signin", signin);
app.post("/api/signout", signout);
app.post("/api/change-password", changePassword);
app.post("/api/posts", addPost);
app.post("/api/codes", postCode);
app.post("/api/codes/:code_id/comments", addCodeComment);
app.post("/api/posts/:post_id/comments", addPostComment);

//get
app.get("/api/posts", getAllPosts);
app.get("/api/codes", getAllCodes);
app.get("/api/posts/:post_id", getPostByID);
app.get("/api/codes/:code_id", getCodeByID);
app.get("/api/codes/:code_id/comments", getCodeComments);
app.get("/api/posts/:post_id/comments", getPostComments);

//delete post/code
app.delete("/api/posts/:post_id", deletePost);
app.delete("/api/codes/:code_id", deleteCode);

//delete a code/post comment
app.delete("/api/post-comments/:comment_id", deletePostComment);
app.delete("/api/code-comments/:comment_id", deleteCodeComment)

//patch

module.exports = app;
