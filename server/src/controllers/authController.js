import User from "../models/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { genrateToken } from "../utils/token.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import bcrypt from "bcryptjs";

// register new User
export const register = AsyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username) return next(new ErrorHandler("username is required", 400));
  if (!email) return next(new ErrorHandler("email is required", 400));
  if (!password) return next(new ErrorHandler("password is required", 400));

  const userNameExist = await User.findOne({ username });
  if (userNameExist) return next(new ErrorHandler("username is taken.", 400));

  const emailExist = await User.findOne({ email });
  if (emailExist) return next(new ErrorHandler("User Already exist.", 400));

  let avatar = {
    url: "",
    publicId: "",
  };
  if (req.file) {
    const res = await cloudinaryUpload(req.file.path);
    avatar.url = res.url;
    avatar.publicId = res.public_id;
  }
  const user = await User.create({
    success: true,
    user: {
      username,
      email,
      password,
      avatar,
    },
  });

  if (user) {
  }
  const token = genrateToken(user._id);
  res.cookie("Hello_Token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "None",
  });
  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
  });
});

// login user
export const login = AsyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) return next(new ErrorHandler("username is required", 400));
  if (!password) return next(new ErrorHandler("password is required", 400));

  const user = await User.findOne({ username });
  if (!user) return next(new ErrorHandler("Email or password is wrong.", 402));

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return next(new ErrorHandler("Email or password is wrong.", 402));

  const token = genrateToken(user._id);
  res.cookie("Hello_Token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "None",
  });
  res.status(200).json({
    success: true,
    user: {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
  });
});

// logout
export const logout = AsyncHandler(async (req, res, next) => {
  res.cookie("Hello_Token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    sameSite: "None",
  });
  res.status(200).json({
    success: true,
    message: "user Logout successfully",
  });
});
