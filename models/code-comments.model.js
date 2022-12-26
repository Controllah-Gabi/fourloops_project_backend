const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  body: { type: String, required: true },
  created_at: { type: String, required: true, default: new Date() },
  votes: { type: Number, required: true, default: 0 },
  code_id: mongoose.Schema.Types.ObjectId
});

const Codecomment = mongoose.model("Codecomment", CommentSchema);
module.exports = Codecomment;
