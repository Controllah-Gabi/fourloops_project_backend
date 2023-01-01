const PostComment = require("../models/post-comments.model");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports = {
  addPostComment: (req, res) => {
    const { token } = req.cookies;
    const user = jwt.verify(token, JWT_SECRET);
    const id = user.id;
    const { post_id } = req.params;

    let comment = new PostComment({
      body: req.body.body,
      votes: req.body.votes,
      user: id,
      post: post_id
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

  getPostComments: (req, res) => {
    PostComment.aggregate(
      [
        {
          $lookup: {
            from: "posts",
            localField: "post",
            foreignField: "_id",
            as: "post"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "post_author"
          }
        }
      ], (err, result) => {
        if(err) res.json({status: 500, result: "Internal server error!"})
        res.json({status: 200, result: result});
      }
    );
  },

  deletePostComment: (req, res) => {
    const { comment_id } = req.params;
    PostComment.findByIdAndDelete({ _id: comment_id })
      .then(result => {
        if(!result) res.json({status: 404, result: "Comment not found!"})
        res.json({status: 200, result: null});
      })
      .catch(err => {
        res.json({status: 400, result: err});
      });
  }, 
};

