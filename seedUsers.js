const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const User = require('./models/userModel');

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

const seedDB = async () => {
    await User.deleteMany();
    await User.insertMany(users);
};

seedDB().then(() => {
    mongoose.connection.close();
});