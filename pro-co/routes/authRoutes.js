import express from "express";


import {
  register,
  login
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { loginLimiter } from "../middleware/ratelimiterMiddleware.js";


const router = express.Router();

router.post("/register", authMiddleware,register);

router.post("/login",loginLimiter ,login);

export default router;