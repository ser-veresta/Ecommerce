import express from "express";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import { Product } from "../models/productModel.js";

const router = express.Router();

router.post("/", verifyTokenAndAdmin, async (req, res, next) => {
  const newProduct = new Product(req.body);

  try {
    const product = await newProduct.save();

    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
});

router.get("/find/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  const {
    query: { new: qnew, category: qcategory },
  } = req;
  try {
    let products = await Product.find();

    if (qnew) products = await Product.find().sort({ createdAt: -1 }).limit(5);

    if (qcategory) products = await Product.find({ categories: { $in: [qcategory] } });

    res.status(200).json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
});

export default router;
