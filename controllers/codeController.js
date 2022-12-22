const codeModel = require("../models/codeModel");

module.exports = {
  postCode: (req, res) => {
    let code = new codeModel({
      description: req.body.description,
      code_body: req.body.code_body,
      likes: req.body.likes,
      created_at: req.body.created_at,
      title: req.body.title,
    });
    code
      .save()
      .then((result) => {
        res.json({ success: true, result: result });
      })
      .catch((err) => {
        res.json({ success: false, result: err });
      });
  },
  getAllCodes: (req, res) => {
    codeModel
      .find()
      .then((result) => {
        if (!result) res.json({ success: false, result: "No results found" });
        res.json({ success: true, result: result });
      })
      .catch((err) => res.json({ success: false, result: err }));
  },
};
