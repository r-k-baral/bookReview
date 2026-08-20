import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authMiddleware = async(req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
          console.log("payload in jwt has issue ")
          return res.status(400).json({
            message:"there is issue with payload data"
          })
        }

    req.user = decoded;
  
    
    const isUser = await User.findById(req.user.id)
        if(!isUser){
          return res.status(401).json({
            message:"user  not have  vaild id "
          })
        }
          if(req.user.role !== "admin" && req.user.role !== "reviewer"){
          return res.status(401).json({
            message:"you can not access it role is not define "
          })
          }
    next();
  } catch (error) {
    console.log("Invalid or expired token: ", error.message)
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

export default authMiddleware;