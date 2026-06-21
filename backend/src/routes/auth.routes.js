import express from "express";
import {  signup, signin, logout, getMe } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
// http://localhost:5000/api/auth/signup
router.post("/signin", signin);
router.post("/logout", logout);

router.get("/me", protect, getMe);


export default router;