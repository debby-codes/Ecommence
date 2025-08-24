import Router from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createCartItem,
  deleteCartItems,
  getCartItems,
  updateCartItem,
} from "../controllers/cartApis/barrel.js";

const cartRouter = Router();
cartRouter

  .post("/cart/create/:productId", authMiddleware, createCartItem)
  .get("/carts", authMiddleware, getCartItems)
  .put("/carts/update", authMiddleware, updateCartItem)
  .delete("/carts/delete", authMiddleware, deleteCartItems);
export default cartRouter;
