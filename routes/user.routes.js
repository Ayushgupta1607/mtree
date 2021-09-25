import express from "express";
import {
  getOrdersByUser,
  placeOrder,
} from "../controllers/order.controller.js";
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

route.post("/order/place", auth, placeOrder);
route.get("/orders", auth, getOrdersByUser);

export default route;
