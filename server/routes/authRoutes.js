import express from "express";
import { User } from "../models/userModel.js";
import ErrorResponse from "../utils/errorResponse.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  const newUser = new User({
    username,
    email,
    password,
  });
  try {
    await newUser.save();

    const token = newUser.generateToken();

    const { password, ...data } = newUser._doc;

    res.status(201).json({
      success: true,
      data: { ...data, token },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password: pass } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) return next(new ErrorResponse("Invalid credentials", 404));

    const { password, ...data } = user._doc;

    const isMatch = await user.matchPassword(pass);

    if (!isMatch) return next(new ErrorResponse("Invalid credentials", 404));

    const token = user.generateToken();

    res.status(200).json({ success: true, data: { ...data, token } });
  } catch (err) {
    next(err);
  }
});

router.post("/forgotPassword", async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return next(new ErrorResponse("Email doesn't exist", 404));

    const resetToken = user.generateResetPasswordToken();

    await user.save();

    const resetUrl = `${process.env.CLIENT_URI}/ResetPassword/${resetToken}`;

    const message = `
    <h1>You have requested a password reset</h1>
    <p>Please click the link below</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({
        success: true,
        data: "Email Sent",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/resetPassword/:resetToken", async (req, res, next) => {
  const { resetToken } = req.params;

  const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  console.log(resetToken);

  try {
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) return next(new ErrorResponse("Invalid Reset Password Link", 400));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      message: "Password reset success",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
