import Router from "express";
import { resendOTP, verifyOTP } from "../controllers/otpApis/verifyOTP.js";
const otpRouter = Router();
otpRouter

  .post("/verify", verifyOTP)

  .post("/resend", resendOTP);
export default otpRouter;
