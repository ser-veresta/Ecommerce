import express from "express";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";
import { Order } from "../models/orderModel.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res, next) => {
  const newOrder = new Order(req.body);

  try {
    const order = await newOrder.save();

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
});

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });

    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
});

router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const orders = await Order.find();

    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
});

router.get("/income", verifyTokenAndAdmin, async (req, res, next) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", total: { $sum: "$sales" } } },
    ]);

    res.status(200).json({ success: true, data: income });
  } catch (err) {
    next(err);
  }
});

export default router;
