import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./router"; // router

const app = express();
app.use(cors());
app.use(compression());
app.use(bodyParser.json());

// Connect MongoDB
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL);
mongoose.connection.on("error", (error) => {
  console.log(`MongoDB is not connected with error: ${error}`);
});
mongoose.connection.once("connected", () => {
  console.log("MongoDB is connected 🎉");
});

// Help Check
app.get("/help", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello Check Check!!!", status: "OK" });
});

// Use Router
app.use("/", router());

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
