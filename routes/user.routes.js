import express from "express";
import {
  login,
  register,
  userDetails,
} from "../controllers/user.controller.js";
import { auth } from "../middlewares/Auth.middleware.js";
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/userDetails", auth, userDetails);
export default route;
