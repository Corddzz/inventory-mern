import bcrypt from "bcrypt";
import { validateSignup } from "../validators/authValidator.js";
import { findByEmail, insert } from "../models/User.js";

export const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const error = validateSignup(email, password);
    if (error) return res.status(400).json({ error });

    const existingUser = await findByEmail(email);
    if (existingUser)
      return res.status(409).json({ error: "Email already in use." });

    const hashedPassword = await bcrypt.hash(password, 10);
    await insert(email, hashedPassword);

    const insertedUser = await findByEmail(email, password);

    res.status(201).json({
      message: "User created successfully ✅",
      user: {
        id: insertedUser.id,
        email: insertedUser.email,
        password: insertedUser.password,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
};
