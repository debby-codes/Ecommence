import { Router } from "express";
import { verifyPayment } from "../controllers/paymentApis/verifyPayment.js";
const paymentRouter = Router();
paymentRouter.get("/verify/payment/:referenceId", verifyPayment);
export default paymentRouter;
