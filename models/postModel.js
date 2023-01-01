const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  caption: { type: String },
  img: { type: String, required: true },
  likes: { type: Number, default: 0, required: true },
  author: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
