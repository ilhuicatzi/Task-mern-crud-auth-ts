import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY_JWT } from "../config";
import mongoose from "mongoose";

type DecodedToken = JwtPayload | string | undefined;

export function createAccessToken(
  payload: mongoose.Types.ObjectId | object,
): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token as string);
    });
  });
}

export const decodeToken = (token: string): Promise<DecodedToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY_JWT, (error, decoded) => {
      if (error) {
        reject(error);
      } else {
        resolve(decoded);
      }
    });
  });
};
