const mongoose = require("mongoose");

const dotenv = require("dotenv");
const app = require('./app');

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


const userProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name']
    }, 
    username: {
        type: String,
        required: [true, 'A user must have a unique username'],
        unique: true
    }
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

// const testUser = new UserProfile({
//     name: "Controllah Gabi",
//     username: "controllaahh5"
// });

// testUser
//     .save()
//     .then(doc => {
//         console.log(doc);
//     }).catch(err => {
//         console.log('Error: ', err);
//     })

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});