import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { userRouter } from "./routers/userRouter";

dotenv.config();
const DB_URL = process.env.DB_URL_DEV;
mongoose
  .connect(DB_URL as string)
  .then(() => console.log("mongodb connect..."))
  .catch((err) => console.log("Error"));

const app = express();

app.use(express.json())

app.use("/", userRouter);

app.get("/", (req, res) => {
  return res.status(200).json({ msg: "Hello from user service." });
});

const port_connection = process.env.PORT
app.listen(port_connection);
