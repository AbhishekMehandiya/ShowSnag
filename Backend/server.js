import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDb from "./config/db.js";
import { clerkMiddleware } from '@clerk/express' 
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"


const app=express();
const port=3000;


app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

try{
 await connectDb();
}
catch(e){
    console.log(e);
}

app.get("/",(req,res)=>res.send("server is live"));
app.use("/api/inngest", serve({ client: inngest, functions }));

export default app;