const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const Code = require('./models/codeModel');
const Comment = require('./models/commentModel');
const Post = require('./models/postModel');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE;

mongoose.set('strictQuery', true);

mongoose
    .connect(DB, 
        err => {
            if(err) throw err;
            console.log("DB connection successful!");
        });

//Read the file
const users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/users.json`, 'utf-8'));
const codes = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/codes.json`, 'utf-8'));
const comments = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/comments.json`, 'utf-8'));
const posts = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/posts.json`, 'utf-8'));

const seedDB = async () => {
    await User.deleteMany();
    await User.insertMany(users);

    await Code.deleteMany();
    await Code.insertMany(codes);

    await Comment.deleteMany();
    await Comment.insertMany(comments);

    await Post.deleteMany();
    await Post.insertMany(posts);
};

seedDB().then(() => {
    mongoose.connection.close();
});