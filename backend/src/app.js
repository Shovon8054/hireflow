import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config();

import authRoutes from "./routes/auth.routes.js";


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
// http://localhost:8080/api/auth/signup

// test route
app.get("/", (req, res) => {
  res.send("HireFlow API Running");
});

export default app;