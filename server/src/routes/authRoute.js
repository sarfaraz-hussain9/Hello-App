import express from "express";
import { register, login, logout } from "../controllers/authController.js";
import { multerUpload } from "../middlewares/multerMiddleware.js";
import { LoginOnly } from "../middlewares/authMiddleware.js";

const app = express.Router();

app.post("/", multerUpload.single("avatar"), register);

app.post("/login", login);

// logout if user logedIn
app.put("/logout", LoginOnly, logout);

export default app;
