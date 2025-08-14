import express from "express";
const app = express();
import cors from "cors";
import gameRoute from "./routes/gameRoute";
import scoreRoute from "./routes/scoreRoute";
import imageRoute from "./routes/imageRoute";
import "dotenv/config";
import { errorHandler } from "./middleware/errorMiddleware";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "https://odin-where-is-waldo-frontend-production.up.railway.app",
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: 'GET,PUT,POST,DELETE', 
  credentials: true,
}));

app.use("/game", gameRoute);
app.use("/scoreboard", scoreRoute);
app.use("/image", imageRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Listening on Port ${PORT}`);
});
