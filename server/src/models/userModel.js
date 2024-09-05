import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import pkg from "bcryptjs";

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required."],
      unique: true,
      minlength: [5, "username grater than 4."],
    },
    email: {
      type: String,
      required: [true, "email is required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required."],
      minlength: [6, "password must be greater than 5"],
    },
    avatar: {
      url: {
        type: String,
        required: true,
        default: "temp",
      },
      publicId: {
        type: String,
        required: true,
        default: "temp",
      },
    },
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const { genSalt } = pkg;
  const salt = await genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", schema);

export default User;
