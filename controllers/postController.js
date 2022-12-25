const Post = require("../models/postModel");

module.exports = {
  postPost: (req, res) => {
    let post = new Post({
      caption: req.body.caption,
      img: req.body.img,
      likes: req.body.likes,
      created_at: req.body.created_at,
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
  getAllPosts: (req, res) => {
    Post
      .find()
      .then((result) => {
        if (!result) res.json({ success: false, result: "No results found" });
        res.json({ success: true, result: result });
      })
      .catch((err) => res.json({ success: false, result: err }));
  },
  getPostByID: (req, res) => {
    Post
      .findOne({ post_id: req.params.post_id })
      .then((result) => {
        if (!result) res.json({ success: false, result: "No results found" });
        res.json({ success: true, result: result });
      })
      .catch((err) => res.json({ success: false, result: err }));
  },
  deletePost: (req, res) => {
    Post
      .findOneAndDelete({ post_id: req.params.post_id })
      .then((result) => {
        if (!result) res.json({ success: false, result: "No results found" });
        res.json({ success: true, result: null });
      })
      .catch((err) => res.json({ success: false, result: err }));
  },
};
