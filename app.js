import express from "express";
import mongoose from "mongoose";
import routes from "./startup/routes.js";
// const bodyParser=require('body-parser');
const app = express();
//Dot env
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

dotenv.config();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

//Connection to DB
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to db");
  }
);

app.use(cors());

routes(app);

app.listen(port, function () {
  console.log("Server started on port", port);
});
