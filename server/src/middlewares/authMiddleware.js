import ErrorHandler from "../utils/ErrorHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const LoginOnly = async (req, res, next) => {
  try {
    const token = req.cookies.Hello_Token;
    if (!token) {
      return next(new ErrorHandler("Not authorized, token missing", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return next(
      new ErrorHandler(
        "Authentication failed, token is invalid or expired",
        401
      )
    );
  }
};
