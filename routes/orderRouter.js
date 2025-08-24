import Router from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createOrder,
  getOrders,
  getAnOrder,
  updateOrder,
} from "../controllers/orderApis/barrel.js";
import adminMiddleware from "../middlewares/authMiddleware.js";

const orderRouter = Router();

orderRouter

  .post("/checkout", authMiddleware, createOrder)
  .get("/Orders", authMiddleware, getOrders)
  .get("/order", authMiddleware, adminMiddleware, getAnOrder)
  .put("/update/:id", authMiddleware, adminMiddleware, updateOrder);

export default orderRouter;
