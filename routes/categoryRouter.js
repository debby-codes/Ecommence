import Router from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/productApis/barrel.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const categoryRouter = Router();
categoryRouter

  .post("/create/category", authMiddleware, adminMiddleware, createCategory)
  .get("/getcategory", authMiddleware, getAllCategories);
export default categoryRouter;
