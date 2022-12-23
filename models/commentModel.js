const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: { type: String, required: true },
  type: { type: String, required: true },
  post_id: { type: String, required: true },
  created_at: { type: String, required: true, default: new Date() },
  votes: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("comment", CommentSchema);
