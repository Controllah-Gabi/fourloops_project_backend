const User = require('../models/userModel');

module.exports = {
    postUser: (req, res) => {
        let user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        });
        user.save()
            .then(result => {
                res.json({ status: 201, result: result});
            })
            .catch(err => {
                res.json({status: 400, result: err});
            });
    }
};