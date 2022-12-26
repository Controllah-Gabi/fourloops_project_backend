const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CodeSchema = new Schema({
  title: { type: String, required: true, default: "Title" },
  description: { type: String },
  code_body: { type: String, required: true },
  likes: { type: Number, default: 0, required: true },
  created_at: { type: Date, required: true, default: new Date(+new Date() + 7*24*60*60*1000) },
  user_id: mongoose.Schema.Types.ObjectId
});

const Code = mongoose.model("Code", CodeSchema)
module.exports = Code;
