import express from 'express'
import { signin, signup } from '../controller/userController.js'

const userRouter=express.Router()

userRouter.post("/signup",signup)
userRouter.post('/login',signin)

export default userRouter