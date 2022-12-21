const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require('./app');

const { faker } = require('@faker-js/faker');
const {User, Post, Code, Comment} = require('./schema');

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


for(let i=0; i < 10; i++) {
    const user = new User({
        firstname: faker.name.firstName(0),
        lastname: faker.name.lastName(1),
        registerDate: faker.date.recent(),
        email: faker.internet.email(),
        password: faker.internet.password()
    })
    user.save()
    .then(() => {
        console.log("Account created successfully");
    });

    const post = new Post({
        caption: faker.hacker.phrase(),
        img: faker.image.abstract(),
        likes: faker.random.numeric()
    });
    post.save()
    .then(() => {
        console.log("Post saved successfully!");
    });

    const code = new Code({
        title: faker.name.jobTitle(),
        created_at: faker.date.recent(),
        likes: faker.random.numeric(),
        code_body: faker.hacker.phrase(),
        description: faker.hacker.phrase()
    });

    code.save()
    .then(() => {
        console.log("Code saved successfully!");
    });

    const comment = new Comment({
        created_at: faker.date.recent(),
        body: faker.hacker.phrase(),
        votes: faker.random.numeric()
    });
    comment.save()
    .then(() => {
        console.log("comment saved successfully!");
    });
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});