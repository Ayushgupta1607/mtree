import express from "express";
import mongoose from "mongoose";
import studentRoute from "./controllers/student.controller.js";
// const bodyParser=require('body-parser');
const app = express();
//Dot env
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

//Connection to DB
mongoose.connect(
  "mongodb+srv://mtree:mtree@cluster0.8qjtm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to db");
  }
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/student", studentRoute);
app.use(cors());

app.listen(port, function () {
  console.log("Server started on port", port);
});
