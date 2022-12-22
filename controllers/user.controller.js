const User = require('../models/user.model');

exports.postUser = (req, res) => {
    return User.create(req.body).then(newUser => {
        res.status(201).send({ user : newUser })
    })
};