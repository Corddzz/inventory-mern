import * as bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { validateSignup, validateLogin } from '../validators/authValidator.js';
import { findByEmail, findById, insert } from '../models/User.js';
import jwt from 'jsonwebtoken';

dotenv.config();

export const signUp = async (req, res) => {
  const { email, password, role } = req.body;
  console.log("Received body:", req.body);

  try {
    const error = validateSignup(email, password);
    if (error) return res.status(400).json({ error });

    const existingUser = await findByEmail(email);
    if (existingUser) return res.status(409).json({ error: "Email already in use." });

    const hashedPassword = await bcrypt.hash(password, 10);

    await insert(email, hashedPassword, role);

    const newUser = await findByEmail(email);
    const { password: _hashed, ...safeUser } = newUser;

    res.status(201).json({
      message: "User created successfully ✅",
      user: safeUser
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
    if (error) return res.status(400).json({ error: error });

    const user = await findByEmail(email);
    if (!user) return res.status(401).json({ error: "Email not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password." });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    console.log({ email, token: token }); //Give token if success login

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day, matches the JWT's expiresIn
    });

    return res.status(200).json({ message: "Login Successful", user: email, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found." });

    const { password, ...safeUser } = user;
    res.status(200).json(safeUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

// POST /logout — clears the auth cookie
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};