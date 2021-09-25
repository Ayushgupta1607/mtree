import express, { Router } from "express";
import { editOrder, getOrders } from "../controllers/order.controller.js";
import {
  addProduct,
  editProduct,
  removeProduct,
} from "../controllers/product.controller.js";
import { auth } from "../middlewares/Auth.middleware.js";
const route = Router();

route.post("/product/create", auth, addProduct);
route.put("/product/edit", auth, editProduct);
route.delete("/product/delete", auth, removeProduct);
route.put("/order/edit", auth, editOrder);
route.get("/orders", auth, getOrders);
export default route;
