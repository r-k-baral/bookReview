import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { limiter } from "./middleware/ratelimiterMiddleware.js";
import morgan from "morgan";

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
// limit the payload 
app.use(express.json({limit:"1kb"}));
app.use(limiter)
app.use(morgan('dev'));
// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60
    }
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);

// Home
app.get("/", (req, res) => {
  res.json({
    message: "Book Review API is running"
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});