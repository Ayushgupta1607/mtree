import express from "express";
import { notFound, errorHandler } from "../middlewares/Error.middleware.js";
import userRoutes from "../routes/user.routes.js";
const routes = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/v1/user", userRoutes);
  //   app.use("/api/v1/transaction", transactionRoutes);
  app.use(notFound);
  app.use(errorHandler);
};

export default routes;
