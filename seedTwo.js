const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const Codecomment = require('./models/code-comments.model');
const Postcomment = require('./models/post-comments.model');

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
const codeComments = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/code-comments.json`, 'utf-8'));
const postComments = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/post-comments.json`, 'utf-8'))

const seedDB = async () => {
    await Codecomment.deleteMany();
    await Codecomment.insertMany(codeComments);

    await Postcomment.deleteMany();
    await Postcomment.insertMany(postComments);
};

seedDB().then(() => {
    mongoose.connection.close();
});