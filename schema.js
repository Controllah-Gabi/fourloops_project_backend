const mongoose = require('mongoose');

//Schemas for all endpoints
const userSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: true
     },
    lastname: {
      type: String,
      required: true
     },
    registerDate: {
      type: String,
      required: true,
      default: new Date()
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const postSchema = mongoose.Schema({
    caption: {
        type: String,
        required: false
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
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    },
    code_body: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    }
});


const commentSchema = mongoose.Schema({
    created_at: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        required: true,
        default: 0
    }
});

//Mongoose models for all endpoints
const Post = mongoose.model('posts', postSchema);
const Code = mongoose.model('codes', codeSchema);
const User = mongoose.model('users', userSchema);
const Comment = mongoose.model('comments', commentSchema);

module.exports = {User, Post, Code, Comment};