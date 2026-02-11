import express from "express"
import cors from 'cors'
import dotenv from 'dotenv'
import connectdb from "./config/mongodb.js"
import userRouter from "./route/userRoute.js"
import spendRouter from "./route/spendingRoute.js"
import weekRouter from "./route/weekRoute.js"



dotenv.config()
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())
connectdb()


app.use("/api/khata",userRouter)
app.use("/api/khata",spendRouter)
app.use("/api/khata",weekRouter)
app.get("/",(req,res)=>{
    res.send("hey sanamika");
})


app.listen(process.env.PORT,()=>{
    console.log("server is running")
})