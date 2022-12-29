const User = require("../models/signUp.model");
const bycrypt = require("bcryptjs");

module.exports = {
  postUser: async (req, res) => {
    const {
      firstname,
      lastname,
      email,
      password: plainTextPassword,
    } = req.body;
    const password = await bycrypt.hash(plainTextPassword, 10);
    let user = await new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    });
    user
      .save()
      .then((result) => {
        res.json({ status: 201, result: `Welcome on Board ${firstname}, Have an amazing time on here!` });
      })
      .catch((err) => {
        if (err.code === 11000) {
          console.log("Email already in use! Please Login...");
          res.json({ status: 400, result: "Email already in use! Login..." });
        }
      });
  },
};
