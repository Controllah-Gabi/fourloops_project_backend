const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  body: { type: String, required: true },
  votes: { type: Number, required: true, default: 0 },
  author: mongoose.Schema.Types.ObjectId,
  code: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

const Codecomment = mongoose.model("Codecomment", CommentSchema);
module.exports = Codecomment;