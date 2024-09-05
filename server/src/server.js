import dotenv from "dotenv";
//server
import app from "./app.js";
// database
import connectDB from "./config/database.js";

dotenv.config();

const Port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(Port, () => console.log(`server is running on Port: ${Port}`));
  })
  .catch((err) => console.log(err.message));
