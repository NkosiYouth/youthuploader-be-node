import express, { Express, Request, Response } from "express";
import connectDB from "./config/dbConfig";
import { AuthRoutes } from "./routes";

const app: Express = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json("Welcome to Youth Uploader APIs!");
});

app.use("/api/auth", AuthRoutes);

// Catch-all route
app.get("*", (req: Request, res: Response) => {
  res.json("Page not found");
});


export default app;