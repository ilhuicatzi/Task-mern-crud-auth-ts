import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { JwtPayload } from "jsonwebtoken";
import { decodeToken } from "../libs/jwt"; 

export const authRequired = async (req: Request, res: Response, next: NextFunction) => {
  //console.log(req.cookies);
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = await decodeToken(token);

    if (typeof decoded === 'object' && decoded !== null && 'id' in decoded) {
      const existingUser = await User.findById((decoded as JwtPayload).id);
      if (!existingUser) return res.status(401).json({ message: "Unauthorized" });

      // Si el usuario es autenticado, llama a next()
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
