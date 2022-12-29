const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const changePasswordSchema = new Schema({
  newPassword: {
    type: String,
    required: true,
    trim: true
  },
  token: {
    type: String,
    required: true
  }
});

const ChangePassword = mongoose.model("ChangePassword", changePasswordSchema)
module.exports = ChangePassword;