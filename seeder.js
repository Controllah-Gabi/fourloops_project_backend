const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');
const userModel = require('./models/userModel');
const { argv } = require('process');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.set('strictQuery', true);

mongoose
    .connect(DB, 
        err => {
            if(err) throw err;
            console.log("DB connection successful!");
        });

//Read the file
const users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/users.json`, 'utf-8'))

//import data into db
const importData = async() => {
    try {
        await userModel.create(users)
        console.log("Data successfully loaded!")
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

// //Delete all data from db
const deleteData = async() => {
    try {
        await userModel.deleteMany()
        console.log("Data successfully deleted!")
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] === '--import') {
    importData()
}else if(process.argv[2] === '--delete') {
    deleteData();
}