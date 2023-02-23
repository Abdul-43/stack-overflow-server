import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import QuestionRoute from "./routes/question.js";
import cookieParser from "cookie-parser";

mongoose.set("strictQuery", false);
dotenv.config();
const PORT=8000
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));     
app.use(cors());
app.use(cookieParser());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

app.use("/api/auth", authRoute);

app.use("/api/question",QuestionRoute);

app.listen(PORT, () => {
  connect();
  console.log(`port connected to ${PORT}`);
});