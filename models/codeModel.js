const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CodeSchema = new Schema({
  title: { type: String, required: true, default: "Title" },
  description: { type: String },
  code_body: { type: String, required: true },
  likes: { type: Number, default: 0, required: true },
  author: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

const Code = mongoose.model("Code", CodeSchema)
module.exports = Code;
