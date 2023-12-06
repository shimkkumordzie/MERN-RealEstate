import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Mongo DB");
  })
  .catch((err) => {
    console.log(err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is listening of ${port}...`);
});

app.use("/api/user", userRouter);
