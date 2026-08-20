import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto"
import User from "../models/user.js";
import { loginSchemaZod, UserSchemaZod } from "../validator/user-schema.js";
import { error } from "console";
const hash = (hashingpassword)=>{
  const password = crypto.createHash("sha256").update(hashingpassword).digest("hex")
  return password
}
// REGISTER


export const register = async (req, res) => {
  try {
    if(req.user.role !== "admin"){
      return res.status(401).json({
        message:"you can not access it you are not admin"
      })
    }
    const result= UserSchemaZod.safeParse(req.body)
    if(!result.success){
      const errorSend =  result.error.issues[0].message
      return res.status(400).json({
        message: errorSend
      })
    }
     const { username, email, password , role } = result.data;
  
   
    const existingUser = await User.findOne({
      $or: [
        { username },
        { email }
      ]
    })
    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists"
      });
    }

    const hashedPassword = hash(password)

    const user = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully"
    });
  } catch (error) {
    console.log("Registration failed 500  issue in register:" , error.message)
    res.status(500).json({
      message: "Registration failed",
      error: error.message
    });
  }
};
// LOGIN
export const login = async (req, res) => {
  try {
    const result = loginSchemaZod.safeParse(req.body)
      if(!result.success){
        const errorSend= result.error.issues[0].message
        return res.status(404).json({
          message:"Email or Password is incorrect  ",
          error: errorSend

        })
      }
    const { email, password } = result.data;
   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }
    if(hash(password) !== user.password){
      return res.status(401).json({
        message:"the password is not matching"
      })
    }
    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );
    // Create session
    req.session.userId = user._id;
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.log("login failed 500:" ,error.message)
    res.status(500).json({
      message: "Login failed",
      error: error.message
    });
  }
};
