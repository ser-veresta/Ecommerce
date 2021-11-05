import express from "express";
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_KEY);

const router = express.Router();

router.post("/payment", async (req, res, next) => {
  try {
    const charge = await stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "inr",
    });

    res.status(200).json({ success: true, data: charge });
  } catch (err) {
    next(err);
  }
});

export default router;
