import { User } from "../model/user.js"
import bcrypt from 'bcryptjs'


const signup=async(req,res)=>{
try{
const {username,email,password}=req.body
if(!email|| !username||!password){
    return res.json({success:false,
        message:"Something is missing"
    })
}

const emailExist=await User.findOne({email})
if(emailExist){
    return res.json({success:false,message:"Email already Exist"})
}

const hashpass=await  bcrypt.hash(password,10);

const Users=await User.create({
username,email,password:hashpass
})

const token= Users._id

return res.json({
    success:true,
    message:"User created successful",
    token
})
}catch(error){
    return res.json({success:false,
        message:error.message
    })
}
}


const signin=async(req,res)=>{
   try{
 const {email,password}=req.body
    if(!email ||!password){
        return res.json({
            success:false,
            message:"something is missing"
        })
    } 
    const existEmail=await User.findOne({email})
    if(!existEmail){
        return res.json({
            success:false,
            message:"Email don't Exist . Please signup first"
        })
    }
    const isMatch=await bcrypt.compare(password,existEmail.password)

    if(!isMatch){
        return res.json({
            success:false,
            message:"Password is incorrect"
        })
    }
    const token=existEmail._id
    return res.json({
        success:true,
        message:"signup successfull",
        token
    }) 


   }catch(error){
    return res.json({
        success:false,
        message:error.message
    })
   }
}


export {signin,signup}