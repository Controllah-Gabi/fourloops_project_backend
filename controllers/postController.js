const postSchema = require("../models/postModel");

module.exports = {
  postPost: (req, res) => {
    let post = new postSchema({
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
   postSchema
      .find()
      .then((result) => {
        if (!result) res.json({ success: false, result: "No results found" });
        res.json({ success: true, result: result });
      })
      .catch((err) => res.json({ success: false, result: err }));
  },
  getPostByID: (req,res)=>{
    postSchema
    .findOne({post_id:req.params.post_id})
    .then((result)=>{
      if (!result) res.json({ success: false, result: "No results found" });
        res.json({ success: true, result: result });
      })
      .catch((err) => res.json({ success: false, result: err }));
  }
  
}
