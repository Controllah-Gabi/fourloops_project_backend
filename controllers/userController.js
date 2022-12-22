const userModel = require('../models/userModel');

module.exports = {
    postUser: (req, res) => {
        let user = new userModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        });
        user.save()
            .then(result => {
                res.json({ success: true, result: result});
            })
            .catch(err => {
                res.json({success: false, result: err});
            });
    }
};