import express from "express";
import { signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
// http://localhost:5000/api/auth/signup

export default router;