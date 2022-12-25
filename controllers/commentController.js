const Comment = require("../models/commentModel");

module.exports = {
  postComment: (req, res) => {
    let comment = new Comment({
      body: req.body.body,
      type: req.url.slice(5, 9),
      post_id: req.params.post_id,
      created_at: req.body.created_at,
      votes: req.body.votes,
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
};
