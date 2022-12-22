const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CodeSchema = new Schema({
  description: { type: String },
  code_body: { type: String, required: true },
  likes: { type: Number, default: 0, required: true },
  created_at: { type: String, required: true, default: new Date() },
  title: { type: String, required: true, default: "Title" },
});

module.exports = mongoose.model("code", CodeSchema);
