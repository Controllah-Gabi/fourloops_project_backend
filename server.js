const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require('./app');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE

mongoose.set('strictQuery', true);

mongoose.connect(DB, 
        err => { if(err) throw err;
            console.log("DB connection successful!");
        });


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});