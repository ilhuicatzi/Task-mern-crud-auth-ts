import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";


import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true
  }
));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to my API Z@o Taks" });
});

app.use("/api/auth", authRoutes);

export default app;
