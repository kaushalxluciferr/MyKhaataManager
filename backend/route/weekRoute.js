import express from 'express'
import { addweek, deleteweek, getweek, getweekbyid, updateweek } from '../controller/weekController.js'

const weekRouter=express.Router()

weekRouter.post("/addweek",addweek)
weekRouter.post('/getweek',getweek)
weekRouter.post('/getweekbyid',getweekbyid)
weekRouter.post('/updateweek',updateweek)
weekRouter.post('/deleteweek',deleteweek)


export default weekRouter