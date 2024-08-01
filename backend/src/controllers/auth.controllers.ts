import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { createAccessToken, decodeToken } from "../libs/jwt";

export const register = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const useFound = await User.findOne({ email });
    if (useFound)
      return res.status(400).json({ message: "The email already exists" });

    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: newPassword,
    });
    const savedUser = await newUser.save();

    const token = await createAccessToken({ id: savedUser._id });
    res.cookie("token", token, {
      httpOnly: false, // true in production
      sameSite: "none",
      secure: true, 
    });

    res.json({
      id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      email: savedUser.email,
      createdAt: savedUser.createdAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    const matchPassword = bcrypt.compareSync(password, userFound.password);
    if (!matchPassword)
      return res.status(400).json({ message: "Invalid password" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token, {
      httpOnly: false, // true in production
      sameSite: "none",
      secure: true,
    });

    res.json({
      id: userFound._id,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      email: userFound.email,
      createdAt: userFound.createdAt,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const profile = async (req: Request, res: Response) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

   try {
    const decoded = await decodeToken(token);

    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
      const existingUser = await User.findById((decoded as JwtPayload).id);
      if (!existingUser) return res.status(401).json({ message: "Unauthorized" });

      res.json({
        id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        createdAt: existingUser.createdAt,
      });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
   } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" });
   }
}

export const logout = async (_req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out" });
};

export const verify = async (req: Request, res: Response) => {
  //console.log(req.cookies);
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = await decodeToken(token);

    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
      const existingUser = await User.findById((decoded as JwtPayload).id);
      if (!existingUser) return res.status(401).json({ message: "Unauthorized" });

      res.json({
        id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        createdAt: existingUser.createdAt,
      });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" });
  }
}