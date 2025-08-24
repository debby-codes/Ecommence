import express from "express";
import connectDb from "./dbConnect/mongoDb.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import otpRouter from "./routes/otpRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import categoryRouter from "./routes/categoryRouter.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";
import paymentRouter from "./routes/paymentRouter.js";

dotenv.config();

connectDb();

const app = express();
// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api/otp", otpRouter);
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);
app.use("/api", paymentRouter);

const port = process.env.PORT;

app.listen(port, console.log(`Server listening on port ${port}`));
