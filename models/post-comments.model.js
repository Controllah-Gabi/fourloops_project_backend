const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  body: { type: String, required: true },
  created_at: { type: String, required: true, default: new Date() },
  votes: { type: Number, required: true, default: 0 },
  post_id: mongoose.Schema.Types.ObjectId
});

const Postcomment = mongoose.model("Postcomment", postSchema);
module.exports = Postcomment;