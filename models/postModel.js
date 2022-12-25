const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  caption: { type: String },
  img: { type: String, required: true },
  likes: { type: Number, default: 0, required: true },
  created_at: { type: String, required: true, default: new Date() },
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
