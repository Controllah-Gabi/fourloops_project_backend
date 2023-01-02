const Code = require("../models/codeModel");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports = {
  postCode: (req, res) => {
    const { token } = req.cookies;
    const user = jwt.verify(token, JWT_SECRET);
    const id = user.id;

    let code = new Code({
      title: req.body.title,
      description: req.body.description,
      code_body: req.body.code_body,
      likes: req.body.likes,
      author: id,
    });
    code
      .save()
      .then((result) => {
        res.json({ status: 201, result: result });
      })
      .catch((err) => {
        res.json({ status: 400, result: err });
      });
  },
  
  //GET ALL CODES
  getAllCodes: (req, res) => {
    Code.aggregate(
      [
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "codeAuthor",
          },
        },
      ], (err, result) => {
        if(err) res.json({status: 500, result: "Internal server error!"});
        res.json({status: 200, result: result});
      }
    );
  },

  // GET CODE BY ID
  getCodeByID: (req, res) => {
    const { code_id } = req.params;
    Code.aggregate(
      [
        {
          $match: {_id: mongoose.Types.ObjectId(code_id)}
        },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "codeAuthor",
          }
        }
      ], (err, result) => {
        if(err) res.json({status: 500, result: "Internal server error!"});
        res.json({status: 200, result: result[0]});
      }
    );
  },

  // DELETE A SINGLE CODE
  deleteCode: (req, res) => {
    const { code_id } = req.params;
    Code
      .findOneAndDelete({ code_id: code_id })
      .then((result) => {
        if (!result) res.json({ status: 404, result: "No results found" });
        res.json({ status: 200, result: null });
      })
      .catch((err) => res.json({ status: 400, result: err }));
  },

  updateCode: (req, res) => {
    const { code_id } = req.params;
    Code.updateOne(
      { code_id: code_id },
      { $inc: { likes: 1 }}, (err, result) => {
        if(err) {
          res.json({status: 400, result: err});
        };
        res.json({status: 200, result: result});
      }
    );
  },
};
