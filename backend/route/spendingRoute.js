import express from 'express'
import { addspend, deletespend, getspend, getspendbyid, getWeekSpendingTotals, updatespend } from '../controller/spendingController.js'

const spendRouter=express.Router()
// sss
// s
spendRouter.post("/addspend",addspend)
spendRouter.post('/getspend',getspend)
spendRouter.post('/getspendbyid',getspendbyid)
spendRouter.post('/updatespend',updatespend)
spendRouter.post('/deletespend',deletespend)
spendRouter.post('/getweekspendingtotals', getWeekSpendingTotals);
export default spendRouter