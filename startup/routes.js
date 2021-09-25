import express from "express";
import { notFound, errorHandler } from "../middlewares/Error.middleware.js";
import userRoutes from "../routes/user.routes.js";
import adminRoutes from "../routes/admin.routes.js";
import publicRoutes from "../routes/pulic.route.js";
const routes = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/admin", adminRoutes);
  app.use("/api/v1", publicRoutes);
  app.use(notFound);
  app.use(errorHandler);
};

export default routes;
