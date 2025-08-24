import Router from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import {
  createUser,
  getAllUsers,
  getAUser,
  getByqueryParams,
  updateUser,
  deleteUser,
} from "../controllers/userApis/barrel.js";
const userRouter = Router();
userRouter
  .post("/user/create", createUser)
  // public
  .get("/users", authMiddleware, adminMiddleware, getAllUsers)
  .get("/user/:id", authMiddleware, adminMiddleware, getAUser)
  .get("/usersByquery", authMiddleware, adminMiddleware, getByqueryParams)
  .put("/user/update/:id", authMiddleware, adminMiddleware, updateUser)
  .delete("/user/delete/:id", authMiddleware, adminMiddleware, deleteUser);
export default userRouter;
