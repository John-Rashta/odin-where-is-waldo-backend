import express from "express";
const app = express();
import cors from "cors";
import gameRoute from "./routes/gameRoute";
import scoreRoute from "./routes/scoreRoute";
import "dotenv/config";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/game", gameRoute);
app.use("/scoreboard", scoreRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
