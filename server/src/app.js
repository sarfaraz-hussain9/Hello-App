import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// routes
import authRoute from "./routes/authRoute.js";

// error Middleware
import ErrorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

// cross origin resource sharing
app.use(cors());

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);

// error middleware
app.use(ErrorMiddleware);

export default app;
