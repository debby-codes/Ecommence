import Router from "express";
import {
  createProduct,
  getUserProducts,
  getAllProducts,
  getByqueryParams,
  updateProduct,
  deleteProduct,
} from "../controllers/productApis/barrel.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
const productRouter = Router();

productRouter
  // Public access
  .get("/getAllP", authMiddleware, adminMiddleware, getAllProducts)
  .get("/getByQ", getByqueryParams)

  .get("/getUserP", authMiddleware, getUserProducts)
  .post("/create/product", authMiddleware, adminMiddleware, createProduct)
  .put("/product/update/:id", authMiddleware, adminMiddleware, updateProduct)
  .delete(
    "/product/delete/:id",
    authMiddleware,
    adminMiddleware,
    deleteProduct
  );
export default productRouter;
