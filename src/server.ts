import "dotenv/config";
import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import RootRouter from "./routes/root";
import connectDB from "./config/dbConn";
import AttendeesRouter from "./routes/attendeesRoutes";

connectDB();
const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "public")));

app.use("/", RootRouter);
app.use("/api/attendees", AttendeesRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
