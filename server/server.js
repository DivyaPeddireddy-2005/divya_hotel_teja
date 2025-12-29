import express from "express"
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.jsx";



//  git config --global user.name "DivyaPeddireddy-2005"
// >> git config --global user.email "divyapedireddy017@gmail.com"   
// >>






connectDB()

const app=express()
app.use(cors())  //eneable cross origin resource sharing

//middleware
app.use(express.json())
app.use(clerkMiddleware())


//api to listen to clerk webhooks
app.use("/api/clerk",clerkWebhooks);

app.get('/',(req,res)=>res.send("Api is working"))


const PORT=process.env.PORT || 3000;

// app.listen(PORT,()=> console.log(`server running on port ${PORT}`));


export default app;