const User = require("../models/signUp.model");
const bycrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../config.env`});

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  signin: async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();

    if(!user) {
        return res.json({status: 404, result: "Invalid email/password! SignUp for an account..."});
    }

    if(await bycrypt.compare(password, user.password)) {
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, JWT_SECRET);

        return res.json({status: 'ok', result: {token, message: `Good to see you again ${user.firstname}!`}})
    }
    return res.json({status: 'error', result: "Invalid Email/Password!"})
  }
};