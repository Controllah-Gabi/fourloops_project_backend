const User = require("../models/signUp.model");
const bycrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../config.env`});

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  changePassword: async (req, res) => {
    const { newPassword, token } = req.body;

    try {
        const user = jwt.verify(token, JWT_SECRET);
        const _id = user.id;

        const hashedPassword = await bycrypt.hash(newPassword, 10);
        await User.updateOne(
            {_id},
            {
                $set: { password : hashedPassword }
            }
        );
        return res.json({status: 201, result: "Password changed successfully!"})
    } catch (error) {
        return res.json({status: 400, result: error})
    }
  }
};