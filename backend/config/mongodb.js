import mongoose from "mongoose";


const connectdb=async()=>{

    mongoose.connection.on("connected",()=>{
        console.log("love from mogodb");
    })
    await mongoose.connect(`${process.env.MONGODB_URL}`)
}


export default connectdb