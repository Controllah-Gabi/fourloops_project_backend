const CodeComment = require("../models/code-comments.model");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

module.exports = {
  addCodeComment: (req, res) => {
    const { token } = req.cookies;
    const user = jwt.verify(token, JWT_SECRET);
    const id = user.id;
    const { code_id } = req.params;

    let comment = new CodeComment({
      body: req.body.body,
      votes: req.body.votes,
      author: id,
      code: code_id
    });
    comment
      .save()
      .then((result) => {
        res.json({ status: 201, result: result });
      })
      .catch((err) => {
        res.json({ status: 400, result: err });
      });
  },

  getCodeComments: (req, res) => {
    CodeComment.aggregate(
      [
        {
          $lookup: {
            from: "codes",
            localField: "code",
            foreignField: "_id",
            as: "code"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "comment_author"
          }
        }
      ], (err, result) => {
        if(err) res.json({status: 500, result: "Internal server error!"})
        res.json({status: 200, result: result});
      }
    );
  },

  deleteCodeComment: (req, res) => {
    const { comment_id } = req.params;
    CodeComment.findByIdAndDelete({ _id: comment_id })
      .then(result => {
        if(!result) res.json({status: 404, result: "Comment not found!"})
        res.json({status: 200, result: null});
      })
      .catch(err => {
        res.json({status: 400, result: err});
      });
  },

  updateCodeComment: (req, res) => {
    const { comment_id } = req.params;
    CodeComment.updateOne(
      { comment_id: comment_id },
      { $inc: { votes: 1 }}, (err, result) => {
        if(err) {
          res.json({status: 400, result: err});
        };
        res.json({status: 200, result: result});
      }
    );
  },
};
