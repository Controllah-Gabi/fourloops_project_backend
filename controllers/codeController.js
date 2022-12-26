const Code = require("../models/codeModel");

module.exports = {
  postCode: (req, res) => {
    let code = new Code({
      title: req.body.title,
      description: req.body.description,
      code_body: req.body.code_body,
      likes: req.body.likes,
      created_at: req.body.created_at
    });
    code
      .save()
      .then((result) => {
        res.json({ status: 201, result: result });
      })
      .catch((err) => {
        res.json({ status: 400, result: err });
      });
  },
  getAllCodes: (req, res) => {
    Code
      .find()
      .then((result) => {
        if (!result) res.json({ success: false, result: "No results found" });
        res.json({ success: true, result: result });
      })
      .catch((err) => res.json({ success: false, result: err }));
  },
  getCodeByID: (req, res) => {
    Code
      .findOne({ code_id: req.params.post_id })
      .then((result) => {
        if (!result) res.json({ success: false, result: "No results found" });
        res.json({ success: true, result: result });
      })
      .catch((err) => res.json({ success: false, result: err }));
  },
  deleteCode: (req, res) => {
    Code
      .findOneAndDelete({ code_id: req.params.code_id })
      .then((result) => {
        if (!result) res.json({ success: false, result: "No results found" });
        res.json({ success: true, result: null });
      })
      .catch((err) => res.json({ success: false, result: err }));
  },
};
