import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./configs/db.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

const app = express();

// IMPORTANT: raw body for Clerk webhook
app.use("/api/clerk", express.raw({ type: "application/json" }));

// Normal JSON parsing
app.use(express.json());
app.use(cors());

// Connect DB only once
connectDB();

// Clerk middleware
app.use(clerkMiddleware());

// Routes
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.use("/api/clerk", clerkWebhooks);

// DO NOT LISTEN (Vercel handles it)
export default app;
