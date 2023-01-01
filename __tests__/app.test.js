const User = require("../models/signUp.model");
const Post = require("../models/postModel");

const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../config.env` });
mongoose.set("strictQuery", true);

beforeEach(async () => {
  await mongoose.connect(process.env.DATABASE);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe(" POST /api/register-user", () => {
  test("POST: 201 - returns an object containing the new user", async () => {
    const newUser = {
      firstname: "Joel",
      lastname: "Aliyu",
      email: "joelaliyu1@gmail.com",
      password: "joelali5",
    };
    const res = await request(app).post("/api/register-user").send(newUser);
    expect(res.body.status).toBe(201);
    expect(res.body.result).toMatchObject({
      firstname: expect.any(String),
      lastname: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
    });
  });
});

describe("POST /api/posts", () => {
  test("POST: 201 - returns an object containing the new post", async () => {
    const newPost = {
      caption: "This is a picture I drew",
      img: "https://blogs-images.forbes.com/trevornace/files/2016/05/mount-doom.gif",
    };
    const res = await request(app).post("/api/posts").send(newPost);
    expect(res.body.status).toBe(201);
    expect(res.body.result).toMatchObject({
      caption: expect.any(String),
      img: expect.any(String),
      likes: expect.any(Number),
      created_at: expect.any(String),
    });
  });
});

describe("POST /api/codes", () => {
  test("POST: 201 - returns an object containing the new code", async () => {
    const newCode = {
      title: "The rest operator",
      description: "Creating a shallow copy of an array or object",
      code_body: "[...rest operator] / {...prevObject}",
    };
    const res = await request(app).post("/api/codes").send(newCode);
    expect(res.body.status).toBe(201);
    expect(res.body.result).toMatchObject({
      title: expect.any(String),
      description: expect.any(String),
      code_body: expect.any(String),
      likes: expect.any(Number),
      created_at: expect.any(String),
    });
  });
});

describe("GET /api/posts", () => {
  test("status - 200, an array of post objects", async () => {
    const res = await request(app).get("/api/posts");
    expect(res.body.status).toBe(200);
    expect(res.body.result).toBeInstanceOf(Array);
    res.body.result.forEach((post) => {
      expect(post).toMatchObject({
        _id: expect.any(String),
        caption: expect.any(String),
        img: expect.any(String),
        likes: expect.any(Number),
        created_at: expect.any(String),
      });
    });
  });
});

describe("GET /api/posts/:post_id", () => {
  test("status - 200, an array of post objects", async () => {
    const res = await request(app).get("/api/posts/63aa1c66391f481b9deddcb9");
    expect(res.body.status).toBe(200);
    expect(res.body.result).toMatchObject({
      _id: expect.any(String),
      caption: expect.any(String),
      img: expect.any(String),
      likes: expect.any(Number),
      created_at: expect.any(String),
      user_id: expect.any(String),
    });
  });
});

// describe("GET /api/codes/:code_id", () => {
//   test("status - 200, an array of post objects", () => {
//     return request(app)
//       .get("/api/codes/63a57c87dba9c096147a7755")
//       .expect(200)
//       .then(({ body }) => {
//         console.log(body.result);
//         expect(body.result).toEqual(
//           expect.objectContaining({
//             _id: expect.any(String),
//             description: expect.any(String),
//             code_body: expect.any(String),
//             likes: expect.any(Number),
//             created_at: expect.any(String),
//             title: expect.any(String),
//           })
//         );
//       });
//   });
// });

// describe("GET /api/codes", () => {
//   test("status - 200, an array of code objects", () => {
//     return request(app)
//       .get("/api/codes")
//       .expect(200)
//       .then(({ body }) => {
//         console.log(body.result);
//         expect(body.result).toBeInstanceOf(Array);
//         body.result.forEach((code) => {
//           expect(code).toEqual(
//             expect.objectContaining({
//               _id: expect.any(String),
//               description: expect.any(String),
//               code_body: expect.any(String),
//               likes: expect.any(Number),
//               created_at: expect.any(String),
//               title: expect.any(String),
//             })
//           );
//         });
//       });
//   });
// });

// describe("DELETE /api/codes/:code_id", () => {
//   test("status - 204, request successfully fulfilled", () => {
//     return request(app)
//       .delete("/api/codes/63a5799705e02a0a9eb957f2")
//       .expect(204);
//   });
// });

// describe("DELETE /api/posts/:post_id", () => {
//   test("status - 200, request successfully fulfilled", () => {
//     return request(app)
//       .delete("/api/posts/63a5799705e02a0a9eb957f0")
//       .expect(200);
//   });
// });

// describe("POST /api/posts/:post_id/comments", () => {
//   test("POST: 200 - returns an object containing the new comment", () => {
//     const newComment = {
//       body: "This is well good matey",
//       type: "post",
//     };
//     return request(app)
//       .post("/api/posts/63a57c87dba9c096147a7753/comments")
//       .send(newComment)
//       .expect(200)
//       .then(({ body }) => {
//         console.log(body);
//         expect(body.result).toMatchObject({
//           _id: expect.any(String),
//           body: expect.any(String),
//           type: expect.any(String),
//           post_id: expect.any(String),
//           created_at: expect.any(String),
//           votes: expect.any(Number),
//         });
//       });
//   });
// });
