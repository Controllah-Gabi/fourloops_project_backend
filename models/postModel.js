const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  caption: { type: String },
  img: { type: String, required: true },
  likes: { type: Number, default: 0, required: true },
  created_at: { type: Date, required: true, default: new Date(+new Date() + 7*24*60*60*1000) },
  user_id: mongoose.Schema.Types.ObjectId
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
