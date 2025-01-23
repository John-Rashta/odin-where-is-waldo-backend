import request from 'supertest';
import express from 'express';
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", (req, res) => {
    res.json({'hello': 'world'});
});

test("basic test", done => {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect({ hello: "world" })
      .expect(200, done);
  });
  