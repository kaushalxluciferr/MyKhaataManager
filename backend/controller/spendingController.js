import { Spending } from "../model/speding.js";

const addspend=async (req, res) => {
    try {
        const { weekId, name, amount, userId } = req.body
        
        if (!weekId || !name || !amount || !userId) {
            return res.json({
                success: false,
                message: "Week ID, name, amount and user ID are required"
            })
        }

        // Check if week belongs to user
        const week = await Week.findOne({ _id: weekId, userId })
        
        if (!week) {
            return res.json({
                success: false,
                message: "Week not found"
            })
        }

        const spending = await Spending.create({
            weekId,
            name,
            amount
        })

        return res.json({
            success: true,
            message: "Spending added successfully",
            spending
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


const getspend= async (req, res) => {
    try {
        const { weekId, userId } = req.body
        
        if (!weekId || !userId) {
            return res.json({
                success: false,
                message: "Week ID and User ID are required"
            })
        }

        // Check if week belongs to user
        const week = await Week.findOne({ _id: weekId, userId })
        
        if (!week) {
            return res.json({
                success: false,
                message: "Week not found"
            })
        }

        const spendings = await Spending.find({ weekId }).sort({ createdAt: -1 })

        // Calculate total spent and remaining
        const totalSpent = spendings.reduce((sum, spending) => sum + spending.amount, 0)
        const remaining = week.totalAmount - totalSpent

        return res.json({
            success: true,
            spendings,
            weekInfo: {
                weekName: week.weekName,
                totalAmount: week.totalAmount,
                totalSpent,
                remaining
            }
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const getspendbyid=async (req, res) => {
    try {
        const { spendingId, userId } = req.body
        
        if (!spendingId || !userId) {
            return res.json({
                success: false,
                message: "Spending ID and User ID are required"
            })
        }

        const spending = await Spending.findById(spendingId)
        
        if (!spending) {
            return res.json({
                success: false,
                message: "Spending not found"
            })
        }

        // Check if associated week belongs to user
        const week = await Week.findOne({ _id: spending.weekId, userId })
        
        if (!week) {
            return res.json({
                success: false,
                message: "Not authorized to view this spending"
            })
        }

        return res.json({
            success: true,
            spending
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const updatespend=async (req, res) => {
    try {
        const { spendingId, userId, name, amount } = req.body
        
        if (!spendingId || !userId) {
            return res.json({
                success: false,
                message: "Spending ID and User ID are required"
            })
        }

        const spending = await Spending.findById(spendingId)
        
        if (!spending) {
            return res.json({
                success: false,
                message: "Spending not found"
            })
        }

        // Check if associated week belongs to user
        const week = await Week.findOne({ _id: spending.weekId, userId })
        
        if (!week) {
            return res.json({
                success: false,
                message: "Not authorized to update this spending"
            })
        }

        const updatedSpending = await Spending.findByIdAndUpdate(
            spendingId,
            { name, amount },
            { new: true }
        )

        return res.json({
            success: true,
            message: "Spending updated successfully",
            spending: updatedSpending
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


const deletespend= async (req, res) => {
    try {
        const { spendingId, userId } = req.body
        
        if (!spendingId || !userId) {
            return res.json({
                success: false,
                message: "Spending ID and User ID are required"
            })
        }

        const spending = await Spending.findById(spendingId)
        
        if (!spending) {
            return res.json({
                success: false,
                message: "Spending not found"
            })
        }

        // Check if associated week belongs to user
        const week = await Week.findOne({ _id: spending.weekId, userId })
        
        if (!week) {
            return res.json({
                success: false,
                message: "Not authorized to delete this spending"
            })
        }

        await Spending.findByIdAndDelete(spendingId)

        return res.json({
            success: true,
            message: "Spending deleted successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export {addspend,getspend,getspendbyid,updatespend,deletespend}