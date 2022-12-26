const CodeComment = require("../models/code-comments.model");

module.exports = {
  postCodeComment: (req, res) => {
    let comment = new CodeComment({
      author: req.body.author,
      body: req.body.body,
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
