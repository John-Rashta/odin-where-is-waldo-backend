import request from 'supertest';
import express from 'express';
import { deleteGamesAndScores } from '../util/queries';
import gameRoute from "../routes/gameRoute";
import scoreRoute from "../routes/scoreRoute";
import imageRoute from "../routes/imageRoute";
import "dotenv/config";
import { errorHandler } from '../middleware/errorMiddleware';
const app = express();

afterAll(() => {
    return deleteGamesAndScores();
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/game", gameRoute);
app.use("/scoreboard", scoreRoute);
app.use("/image", imageRoute);

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

test("Starts game without query", (done) => {
    request(app)
        .post("/game")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
            expect(res.body).toHaveProperty("game");
            done();
        })
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
                expect(res.body).toHaveProperty("game");
                newGame = res.body.game;
                done();
            })
    });

    test("Gets characters for game", (done) => {
        request(app)
            .get(`/game/${newGame}/characters`)
            .expect("Content-Type", /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toHaveProperty("chars");
                done();
            })
    });

    test("Finds first char", (done) => {
        request(app)
            .put(`/game/${newGame}`)
            .send({
                coordX: "1144",
                coordY: "555",
                char: "e76d8ef7-a1da-46d6-8040-b747b3382a68",
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
                char: "5a5b2583-23fb-4255-bf03-1ef6d065951b",
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
                char: "666050b1-95f6-4bf4-ac84-9498a0e97cd3",
            })
            .expect("Content-Type", /json/)
            .expect({ 
                message: "Game Finished"
                })
            .expect(200, done);
    });

    ///moved this error here so that another game doesn't have to be completed just to test this
    test("Doesn't update if game is finished already", (done) => {
        request(app)
            .put(`/game/${newGame}`)
            .send({
                coordX: "110",
                coordY: "315",
                char: "666050b1-95f6-4bf4-ac84-9498a0e97cd3",
            })
            .expect("Content-Type", /json/)
            .expect({ 
                message: "Invalid Game State"
                })
            .expect(400, done);
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
            .expect(200, done);
    });

    ///moved this error here so that another game doesn't have to be completed just to test this
    test("Doesnt add more than once to scoreboard", done => {
        request(app)
            .post(`/scoreboard/${newGame}`)
            .send({
                username: "blueeyes456"
                })
            .expect("Content-Type", /json/)
            .expect({ 
                message: "Game Already Added"
                })
            .expect(400, done);
    });
})




  