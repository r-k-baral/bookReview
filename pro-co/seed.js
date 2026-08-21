import mongoose from "mongoose";
import crypto from "crypto";
import dotenv from "dotenv";
import User from "./models/user.js";

dotenv.config();

const hash = (password) => {
  return crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
};

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Remove existing users
    await User.deleteMany({});

    // Create users
    const users = [
      {
        username: "admin",
        email: "admin@gmail.com",
        password: hash("admin123"),
        role: "admin"
      },
      {
        username: "reviewer",
        email: "reviewer@gmail.com",
        password: hash("reviewer123"),
        role: "reviewer"
      },
      {
        username: "user",
        email: "user@gmail.com",
        password: hash("user123"),
        role: "user"
      }
    ];

    await User.insertMany(users);

    console.log("Users seeded successfully");

    console.log(`
Login accounts:

Admin:
email: admin@gmail.com
password: admin123

Reviewer:
email: reviewer@gmail.com
password: reviewer123

User:
email: user@gmail.com
password: user123
`);

    await mongoose.connection.close();

    console.log("MongoDB connection closed");

  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedUsers();