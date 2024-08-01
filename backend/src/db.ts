import mongoose from "mongoose";
import { MONGO_URI } from "./config";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log("Database connected: ", conn.connection.name);
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};
