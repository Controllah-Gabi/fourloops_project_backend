const request = require('supertest');
const db = require('../server');
const app = require('../app');

// afterAll(() => {
//     return db.end();
// });

describe("/api/users", () => {
    test('POST: 201 - returns an object containing the new user', () => {
        const newUser = {
            firstname: "Joel",
            lastname: "Aliyu",
            email: "joelaliyu1@gmail.com",
            password: "joeldcrew345"
        };
        return request(app)
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .then(({body}) => {
                console.log(body);
                expect(body.user).toMatchObject({
                    _id: expect.any(String),
                    firstname: expect.any(String),
                    lastname: expect.any(String),
                    email: expect.any(String),
                    password: expect.any(String)
                })
            })
    })
})