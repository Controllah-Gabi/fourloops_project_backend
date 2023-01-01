const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  body: { type: String, required: true },
  votes: { type: Number, required: true, default: 0 },
  user: mongoose.Schema.Types.ObjectId,
  post: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

const Postcomment = mongoose.model("Postcomment", postSchema);
module.exports = Postcomment;