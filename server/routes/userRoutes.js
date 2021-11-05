import express from "express";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middlewares/verifyToken.js";
import { User } from "../models/userModel.js";

const router = express.Router();

router.patch("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ _id: req.params.id });

    user.username = username || user.username;
    user.password = password || user.password;
    user.email = email || user.email;

    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", verifyTokenAndAuthorization, async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
});

router.get("/find/:id", verifyTokenAndAdmin, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...data } = user._doc;

    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

router.get("/", verifyTokenAndAdmin, async (req, res, next) => {
  const { query } = req;
  try {
    const users = query.new ? await User.find().sort({ createdAt: -1 }).limit(5) : await User.find();

    res.status(200).json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
});

router.get("/stats", verifyTokenAndAdmin, async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

export default router;
