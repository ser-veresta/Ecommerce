import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import errorHandler from "./middlewares/error.js";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import stripeRouter from "./routes/stripe.js";

const app = express();

const Port = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URI }));

app.use(express.json());

app.use(morgan("dev"));

app.use("/auth", authRouter);

app.use("/users", userRouter);

app.use("/products", productRouter);

app.use("/orders", orderRouter);

app.use("/checkout", stripeRouter);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(Port, () => console.log(`server running in port:${Port}`)))
  .catch((err) => console.log(err));
