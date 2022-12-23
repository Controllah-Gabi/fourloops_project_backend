const request = require("supertest");
const db = require("../server");
const app = require("../app");

afterAll(() => {
    if(db.end) db.end()
});

describe(" POST /api/users", () => {
  test("POST: 200 - returns an object containing the new user", () => {
    const newUser = {
      firstname: "Joel",
      lastname: "Aliyu",
      email: "joelaliyu6@gmail.com",
      password: "joeldcrew345",
    };
    return request(app)
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body.result).toMatchObject({
          _id: expect.any(String),
          firstname: expect.any(String),
          lastname: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
        });
      });
  });
});

describe("POST /api/posts", () => {
  test("POST: 200 - returns an object containing the new post", () => {
    const newPost = {
      caption: "This is a picture I drew",
      img: "https://blogs-images.forbes.com/trevornace/files/2016/05/mount-doom.gif",
    };
    return request(app)
      .post("/api/posts")
      .send(newPost)
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body.result).toMatchObject({
          _id: expect.any(String),
          caption: expect.any(String),
          img: expect.any(String),
          likes: expect.any(Number),
          created_at: expect.any(String),
        });
      });
  });
});

describe("POST /api/codes", () => {
  test("POST: 200 - returns an object containing the new code", () => {
    const newCode = {
      description: "This is a code I coded",
      code_body: "const Stephen = 'da best'",
      title: "Best code mate",
    };
    return request(app)
      .post("/api/codes")
      .send(newCode)
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body.result).toMatchObject({
          _id: expect.any(String),
          description: expect.any(String),
          code_body: expect.any(String),
          likes: expect.any(Number),
          created_at: expect.any(String),
          title: expect.any(String),
        });
      });
  });
});

describe("GET /api/posts", () => {
  test("status - 200, an array of post objects", () => {
    return request(app)
      .get("/api/posts")
      .expect(200)
      .then(({ body }) => {
        console.log(body.result);

        expect(body.result).toBeInstanceOf(Array);
        body.result.forEach((post) => {
          expect(post).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              caption: expect.any(String),
              img: expect.any(String),
              likes: expect.any(Number),
              created_at: expect.any(String),
            })
          );
        });
      });
  });
});

describe("GET /api/posts/:post_id", () => {
  test("status - 200, an array of post objects", () => {
    return request(app)
      .get("/api/posts/63a57c4e1fc4ad263a4adf36")
      .expect(200)
      .then(({ body }) => {
        console.log(body.result);
          expect(body.result).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              caption: expect.any(String),
              img: expect.any(String),
              likes: expect.any(Number),
              created_at: expect.any(String),
            })
          );
        });
      });
  })

  describe.only("GET /api/codes/:code_id", () => {
    test("status - 200, an array of post objects", () => {
      return request(app)
        .get("/api/codes/63a57c87dba9c096147a7755")
        .expect(200)
        .then(({ body }) => {
          console.log(body.result);
            expect(body.result).toEqual(
              expect.objectContaining({
                _id: expect.any(String),
                description: expect.any(String),
                code_body: expect.any(String),
                likes: expect.any(Number),
                created_at: expect.any(String),
                title: expect.any(String),
              })
            );
          });
        });
    });


describe("GET /api/codes", () => {
  test("status - 200, an array of code objects", () => {
    return request(app)
      .get("/api/codes")
      .expect(200)
      .then(({ body }) => {
        console.log(body.result);
        expect(body.result).toBeInstanceOf(Array);
        body.result.forEach((code) => {
          expect(code).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              description: expect.any(String),
              code_body: expect.any(String),
              likes: expect.any(Number),
              created_at: expect.any(String),
              title: expect.any(String),
            })
          );
        });
      });
  });
});
