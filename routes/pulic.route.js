import express from "express";
import { getOrderById, getOrders } from "../controllers/order.controller.js";
import {
  listProducts,
  productById,
} from "../controllers/product.controller.js";

const route = express.Router();

route.get("/products", listProducts);
route.get("/product/ById", productById);

route.get("/order/ById", getOrderById);

export default route;
