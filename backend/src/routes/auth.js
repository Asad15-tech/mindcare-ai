const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const otpStore = {};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, username: user.username, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, username: user.username, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Send OTP
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'No account found with this email' });

    const otp = generateOTP();
    otpStore[email] = { otp, expiry: Date.now() + 10 * 60 * 1000 };

    await transporter.sendMail({
      from: `"MindCare AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'MindCare AI — Password Reset OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; background: #f0f7f0; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #2e7d32; font-size: 28px;">🧠 MindCare AI</h1>
            <p style="color: #555;">Your Personal Mental Wellness Companion</p>
          </div>
          <div style="background: white; border-radius: 12px; padding: 24px; text-align: center; border: 1px solid #c8e6c9;">
            <h2 style="color: #2e7d32; margin-bottom: 8px;">Password Reset OTP</h2>
            <p style="color: #555; margin-bottom: 20px;">Use the code below to reset your password:</p>
            <div style="background: #e8f5e9; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <span style="font-size: 42px; font-weight: 800; color: #2e7d32; letter-spacing: 10px;">${otp}</span>
            </div>
            <p style="color: #888; font-size: 14px;">⏱️ This OTP expires in <strong>10 minutes</strong></p>
            <p style="color: #888; font-size: 13px; margin-top: 8px;">If you didn't request this, please ignore this email.</p>
          </div>
          <p style="text-align: center; color: #aaa; font-size: 12px; margin-top: 20px;">© 2024 MindCare AI — All rights reserved</p>
        </div>
      `
    });

    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.log('Email error:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const stored = otpStore[email];
    if (!stored) return res.status(400).json({ message: 'OTP not found. Please request again.' });
    if (Date.now() > stored.expiry) {
      delete otpStore[email];
      return res.status(400).json({ message: 'OTP expired. Please request again.' });
    }
    if (stored.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    res.json({ message: 'OTP verified successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const stored = otpStore[email];
    if (!stored) return res.status(400).json({ message: 'OTP not found. Please request again.' });
    if (Date.now() > stored.expiry) {
      delete otpStore[email];
      return res.status(400).json({ message: 'OTP expired. Please request again.' });
    }
    if (stored.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    delete otpStore[email];
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
