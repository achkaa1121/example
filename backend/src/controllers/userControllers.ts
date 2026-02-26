import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { email, password } = req.body;
    const user = await User.findOne({ email }, { email: 1, password: 1 });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(401).json({ message: "Password wrong" });
      }
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET!,
        { expiresIn: "1h" },
      );
      res.json({ message: "Login successful", token });
    }
  } catch (e) {
    console.error(e, "Server error");
  }
};
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username } = req.body;
    console.log(username);
    const user = await User.findOne({ email });
    if (user) {
      res.json({ message: "You are already signed up" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashedPassword,
        name: username,
      });
      res.json(user);
    }
  } catch (e) {
    console.error(e, "Server error");
  }
};
