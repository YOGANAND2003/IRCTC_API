const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Jwt Token miidleware ke liye
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
  
    const token = authHeader.split(" ")[1]; // Handle "Bearer <token>" format
    if (!token) {
      return res.status(401).json({ message: "Malformed token, authorization denied" });
    }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;