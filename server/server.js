// // import express from "express";
// // import cors from "cors";
// // import "dotenv/config";
// // import { clerkMiddleware } from "@clerk/express";
// // import connectDB from "./configs/db.js";
// // import clerkWebhooks from "./controllers/clerkWebhooks.js";

// // const app = express();

// // // IMPORTANT: raw body for Clerk webhook
// // app.use("/api/clerk", express.raw({ type: "application/json" }));

// // // Normal JSON parsing
// // app.use(express.json());
// // app.use(cors());

// // // Connect DB only once
// // connectDB();

// // // Clerk middleware
// // app.use(clerkMiddleware());

// // // Routes
// // app.get("/", (req, res) => {
// //   res.send("API is running 🚀");
// // });

// // app.use("/api/clerk", clerkWebhooks);

// // // DO NOT LISTEN (Vercel handles it)
// // // DO NOT LISTEN (Vercel handles it)
// // export default app;

// import express from "express"
// import "dotenv/config";
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from '@clerk/express'
// import clerkWebhooks from "./controllers/clerkWebhooks.jsx";



// //  git config --global user.name "DivyaPeddireddy-2005"
// // >> git config --global user.email "divyapedireddy017@gmail.com"   
// // >>



// connectDB()

// const app=express()
// app.use(cors())  //eneable cross origin resource sharing

// //middleware
// app.use(express.json())
// app.use(clerkMiddleware())


// //api to listen to clerk webhooks
// app.use("/api/clerk",clerkWebhooks);

// app.get('/',(req,res)=>res.send("Api is working"))


// const PORT=process.env.PORT || 3000;

// app.listen(PORT,()=> console.log(`server running on port ${PORT}`));


// export default app;



import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./configs/db.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

const app = express();

// IMPORTANT: webhook needs raw body
app.use("/api/clerk", express.raw({ type: "application/json" }));

// Normal middleware
app.use(express.json());
app.use(cors());

// Connect DB (don't let it crash the app)
connectDB().catch(err => console.log('DB connection failed:', err.message));

// Clerk middleware
app.use(clerkMiddleware());

// Test route
app.get("/", (req, res) => {
  res.status(200).send("api is working");
});

// Clerk webhook
app.use("/api/clerk", clerkWebhooks);

// For local testing only
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// ❌ REMOVE app.listen() for Vercel
// ✅ EXPORT app for Vercel
export default app;
