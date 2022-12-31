const Post = require("../models/postModel");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports = {
  //MAKE A NEW POST
  addPost: (req, res) => {
    const { token } = req.cookies;
    const user = jwt.verify(token, JWT_SECRET);
    const id = user.id;

    let post = new Post({
      caption: req.body.caption,
      img: req.body.img,
      likes: req.body.likes,
      author: id,
    });
    post
      .save()
      .then((result) => {
        res.json({ status: 201, result: result });
      })
      .catch((err) => {
        res.json({ status: 400, result: err });
      });
  },

  //GET ALL POSTS
  getAllPosts: (req, res) => {
    Post.aggregate(
      [
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "postAuthor",
          },
        },
      ], (err, result) => {
        if(err) res.json({status: 500, result: "Internal server error!"});
        res.json({status: 200, result: result});
      }
    );
  },

  //GET A SINGLE POST BASED ON ITS ID
  getPostByID: (req, res) => {
    const { post_id } = req.params;
    Post.aggregate(
      [
        {
          $match: { _id: mongoose.Types.ObjectId(post_id) }
        },
        {
          $lookup: {
            from: "users",
            localField: "author",
            foreignField: "_id",
            as: "postAuthor",
          }
        }
      ], (err, result) => {
        if(err) res.json({status: 500, result: "Internal server error!"});
        res.json({status: 200, result: result[0]});
      }
    );
  },

  //DELETE A SINGLE POST
  deletePost: (req, res) => {
    Post.findOneAndDelete({ post_id: req.params.post_id })
      .then((result) => {
        if (!result) res.json({ success: false, result: "No results found" });
        res.json({ success: true, result: null });
      })
      .catch((err) => res.json({ success: false, result: err }));
  },
};
