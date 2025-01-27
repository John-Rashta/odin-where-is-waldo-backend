import request from 'supertest';
import express from 'express';
import { deleteGames, deleteScores } from '../util/queries';
import gameRoute from "../routes/gameRoute";
import scoreRoute from "../routes/scoreRoute";
import imageRoute from "../routes/imageRoute";
import "dotenv/config";
const app = express();

afterAll(() => {
    return Promise.all([ deleteScores(),deleteGames()]);
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/game", gameRoute);
app.use("/scoreboard", scoreRoute);
app.use("/image", imageRoute);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({message: "internal error"});
  return;
}
app.use(errorHandler);

test("Getting images", done => {
    request(app)
      .get("/image")
      .expect("Content-Type", /json/)
      .expect([{ 
        id: 1,
        name: "Basic Map",
        url: "wwwBasicMapcom"
        }])
      .expect(200, done);
});

test("Getting empty scoreboard", done => {
    request(app)
      .get("/scoreboard")
      .expect("Content-Type", /json/)
      .expect({ 
        message: "No entries in Scoreboard."
        })
      .expect(200, done);
});

describe("Game Route Usage with Score Add", () => {
    let newGame : string;
    test("Starts game", (done) => {
        request(app)
            .post("/game")
            .query({imageid: 1})
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty("chars");
                expect(res.body).toHaveProperty("game");
                newGame = res.body.game;
                done();
            })
    });

    test("Finds first char", (done) => {
        request(app)
            .put(`/game/${newGame}`)
            .send({
                coordX: "1144",
                coordY: "555",
                char: "0402e9c6-5345-489c-8d24-a3e97dd530db",
            })
            .expect("Content-Type", /json/)
            .expect({ 
                message: "Correct Coordinates"
                })
            .expect(200, done);
    });

    test("Finds second char", (done) => {
        request(app)
            .put(`/game/${newGame}`)
            .send({
                coordX: "110",
                coordY: "315",
                char: "1d9011dc-ca50-46c4-97f3-5837e08bcc22",
            })
            .expect("Content-Type", /json/)
            .expect({ 
                message: "Correct Coordinates"
                })
            .expect(200, done);
    });

    test("Finishes game", (done) => {
        request(app)
            .put(`/game/${newGame}`)
            .send({
                coordX: "850",
                coordY: "750",
                char: "fdc10bb9-bf20-41db-b676-3ec571ccce3d",
            })
            .expect("Content-Type", /json/)
            .expect({ 
                message: "Game Finished"
                })
            .expect(200, done);
    });

    test("Add to Scoreboard", done => {
        request(app)
            .post(`/scoreboard/${newGame}`)
            .send({
                username: "darkmagician123"
                })
            .expect("Content-Type", /json/)
            .expect({ 
                message: "Added to Scoreboard"
                })
            .then((res) => {
                console.log(res.body)
                done()
            })
            ///.expect(200, done);
    });
})




  