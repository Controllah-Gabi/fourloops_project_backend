const mongoose = require('mongoose');

//Schemas for all endpoints
const postSchema = mongoose.Schema({
    caption: {
        type: String,
        required: false
    },

    created_at: {
        type: Date,
        required: true
    },

    img: {
        type: String,
        required: true
    },

    likes: {
        type: Number,
        required: true
    }
});

const codeSchema = mongoose.Schema({
    title: {
        type: String,
        required: false
    },

    created_at: {
        type: Date,
        required: true
    },

    likes: {
        type: Number,
        required: true
    },

    code_body: {
        type: Code,
        required: true
    },

    description: {
        type: String,
        required: true
    }
});

const accountSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

const commentSchema = mongoose.Schema({
    created_at: {
        type: Date,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    votes: {
        type: Number,
        required: true
    }
});

//Mongoose models for all endpoints
const Posts = mongoose.model('posts', postSchema);
const Codes = mongoose.model('codes', codeSchema);
const Accounts = mongoose.model('accounts', accountSchema);
const Comments = mongoose.model('comments', commentSchema);