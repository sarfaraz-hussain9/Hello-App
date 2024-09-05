import jwt from "jsonwebtoken";

export const genrateToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
  return token;
};
