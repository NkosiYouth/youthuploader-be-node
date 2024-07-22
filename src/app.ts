import express, { Express, Request, Response } from "express";
import connectDB from "./config/dbConfig";
import { AuthRoutes, FileRoutes } from "./routes";
import cors from "cors";

const app: Express = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

app.use(cors());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json("Welcome to Youth Uploader APIs!");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/files", FileRoutes);

// Catch-all route
app.get("*", (req: Request, res: Response) => {
  res.json("Page not found");
});


export default app;