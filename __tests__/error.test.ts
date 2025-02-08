import request from 'supertest';
import express from 'express';
import gameRoute from "../routes/gameRoute";
import scoreRoute from "../routes/scoreRoute";
import imageRoute from "../routes/imageRoute";
import "dotenv/config";
import { errorHandler } from '../middleware/errorMiddleware';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/game", gameRoute);
app.use("/scoreboard", scoreRoute);
app.use("/image", imageRoute);

app.use(errorHandler);

/// 2 errors are in app.test.ts for efficiency reasons

test("Doesnt start if image doesn't exist.", (done) => {
        request(app)
            .post("/game")
            .query({imageid: 29})
            .expect("Content-Type", /json/)
            .expect(400, done)
});

test("Cant add to scoreboard if game doesn't exist", done => {
        request(app)
            .post(`/scoreboard/fdc10bb9-bf20-41db-b676-3ec571ccce3d`)
            .send({
                username: "darkmagician123"
                })
            .expect("Content-Type", /json/)
            .expect(400, done);
});

 test("Cant update a game that doesn't exist", (done) => {
        request(app)
            .put(`/game/fdc10bb9-bf20-41db-b676-3ec571ccce3d`)
            .send({
                coordX: "110",
                coordY: "315",
                char: "1d9011dc-ca50-46c4-97f3-5837e08bcc22",
            })
            .expect("Content-Type", /json/)
            .expect(400, done);
});

describe("Test errors during gameplay", () => {
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

    test("Gets incorrect when wrong coordinates", (done) => {
        request(app)
            .put(`/game/${newGame}`)
            .send({
                coordX: "1144",
                coordY: "555",
                char: "5a5b2583-23fb-4255-bf03-1ef6d065951b",
            })
            .expect("Content-Type", /json/)
            .expect({ 
                message: "Incorrect Coordinates"
                })
            .expect(200, done);
    });

    test("Cant add to scoreboard if game is in progress", done => {
        request(app)
            .post(`/scoreboard/${newGame}`)
            .send({
                username: "darkmagician123"
                })
            .expect("Content-Type", /json/)
            .expect({
                message: "Invalid Game State"
            })
            .expect(400, done);
    });

    test("Cant update if character isn't in the game", (done) => {
        request(app)
            .put(`/game/${newGame}`)
            .send({
                coordX: "110",
                coordY: "315",
                char: "1d9011dc-ca50-46c4-97f3-5837e08bcc55",
            })
            .expect("Content-Type", /json/)
            .expect(400, done);
    });
})




  