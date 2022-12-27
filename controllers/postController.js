const Post = require("../models/postModel");

module.exports = {
  //MAKE A NEW POST
  addPost: (req, res) => {
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
  //GET ALL POSTS
  getAllPosts: (req, res) => {
    Post.find((err, result) => {
      if(err) console.log(err);
      res.json({status: 200, result: result});
    });
    // const result = Post.aggregate([{
    //   $lookup: {
    //     from: 'users',
    //     localField: 'user_id',
    //     foreignField: '_id',
    //     user: 'user'
    //   }
    // }]);
    // res.json({status: 200, result: result});
  },
  //GET A SINGLE POST BASED ON ITS ID
  getPostByID: (req, res) => {
    Post
      .findOne({ post_id: req.params.post_id })
      .then((result) => {
        if (!result) res.json({ success: false, result: "No results found" });
        res.json({ success: true, result: result });
      })
      .catch((err) => res.json({ success: false, result: err }));
  },
  //DELETE A SINGLE POST
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
