import * as bcrypt from "bcrypt";
import dotenv from "dotenv";
import { validateLogin, validateSignup } from "../validators/authValidator.js";
import { findByEmail, insert } from "../models/User.js";
import jwt from "jsonwebtoken";

dotenv.config();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

export const signUp = async (req, res) => {
  const { email, password } = req.body;

  try {
    const error = validateSignup(email, password);
    if (error) return res.status(400).json({ error });

    const existingUser = await findByEmail(email);
    if (existingUser)
      return res.status(409).json({ error: "Email already in use." });

    const hashedPassword = await bcrypt.hash(password, 10);
    await insert(email, hashedPassword);

    const newUser = await findByEmail(email);

    res.status(201).json({
      message: "User created successfully ✅",
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const error = validateLogin(email, password);
    if (error) return res.status(400).json({ error });

    const user = await findByEmail(email);
    if (!user) return res.status(401).json({ error: "Email not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password." });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_TOKEN_SECRET,
    );

    res.cookie("token", token, COOKIE_OPTIONS);

    return res.status(200).json({
      message: "Login Successful ✅",
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.status(200).json({ message: "Logged out successfully ✅" });
};

export const getMe = async (req, res) => {
  try {
    const user = await findByEmail(email);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
