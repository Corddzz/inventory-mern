import * as bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { validateSignup, validateLogin } from '../validators/authValidator.js';
import { findByEmail, insert } from '../models/User.js';
import jwt from 'jsonwebtoken';

dotenv.config();

export const signUp = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const error = validateSignup(email, password);
    if (error) return res.status(400).json({ error });

    const existingUser = await findByEmail(email);
    if (existingUser) return res.status(409).json({ error: "Email already in use." });

    const hashedPassword = await bcrypt.hash(password, 10);
    await insert(email, hashedPassword, role);

    const newUser = await findByEmail(email);

    res.status(201).json({
      message: "User created successfully ✅",
      user: newUser
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

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_TOKEN_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true

    });

    return res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};