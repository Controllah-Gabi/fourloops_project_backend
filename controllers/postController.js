const postModel = require("../models/postModel");

module.exports = {
  postPost: (req, res) => {
    let post = new postModel({
      caption: req.body.caption,
      img: req.body.img,
      likes: req.body.likes,
      created_at: req.body.created_at,
    });
    post
      .save()
      .then((result) => {
        res.json({ success: true, result: result });
      })
      .catch((err) => {
        res.json({ success: false, result: err });
      });
  },
  getAllPosts: (req, res) => {
    postModel
      .find()
      .then((result) => {
        if (!result) res.json({ success: false, result: "No results found" });
        res.json({ success: true, result: result });
      })
      .catch((err) => res.json({ success: false, result: err }));
  },
};
