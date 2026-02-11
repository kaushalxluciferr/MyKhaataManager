import { Spending } from "../model/speding.js";
import { Week } from "../model/week.js";


const addweek = async (req, res) => {
    try {
        const { weekName, totalAmount, userId } = req.body;
        
        if (!weekName || !totalAmount || !userId) {
            return res.json({
                success: false,
                message: "Week name, total amount and user ID are required"
            });
        }

        const week = await Week.create({
            userId,
            weekName,
            totalAmount
        });

        return res.json({
            success: true,
            message: "Week created successfully",
            week
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}

const getweek = async (req, res) => {
    try {
        const { userId } = req.body;
        
        if (!userId) {
            return res.json({
                success: false,
                message: "User ID is required"
            });
        }

        const weeks = await Week.find({ userId }).sort({ createdAt: -1 });

        // Get spending totals for all weeks
        const weeksWithSpending = await Promise.all(
            weeks.map(async (week) => {
                const spendings = await Spending.find({ weekId: week._id });
                const totalSpent = spendings.reduce((sum, spending) => sum + spending.amount, 0);
                const remaining = week.totalAmount - totalSpent;
                
                return {
                    ...week.toObject(),
                    totalSpent,
                    remaining,
                    progress: week.totalAmount > 0 ? (totalSpent / week.totalAmount) * 100 : 0
                };
            })
        );

        return res.json({
            success: true,
            weeks: weeksWithSpending
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}


const getweekbyid=async (req, res) => {
    try {
        const { weekId, userId } = req.body
        
        if (!weekId || !userId) {
            return res.json({
                success: false,
                message: "Week ID and User ID are required"
            })
        }

        const week = await Week.findOne({ _id: weekId, userId })
        
        if (!week) {
            return res.json({
                success: false,
                message: "Week not found"
            })
        }

        return res.json({
            success: true,
            week
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

const updateweek=async (req, res) => {
    try {
        const { weekId, userId, weekName, totalAmount } = req.body
        
        if (!weekId || !userId) {
            return res.json({
                success: false,
                message: "Week ID and User ID are required"
            })
        }

        const week = await Week.findOne({ _id: weekId, userId })
        
        if (!week) {
            return res.json({
                success: false,
                message: "Week not found"
            })
        }

        const updatedWeek = await Week.findByIdAndUpdate(
            weekId,
            { weekName, totalAmount },
            { new: true }
        )

        return res.json({
            success: true,
            message: "Week updated successfully",
            week: updatedWeek
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}


const deleteweek=async (req, res) => {
    try {
        const { weekId, userId } = req.body
        
        if (!weekId || !userId) {
            return res.json({
                success: false,
                message: "Week ID and User ID are required"
            })
        }

        const week = await Week.findOne({ _id: weekId, userId })
        
        if (!week) {
            return res.json({
                success: false,
                message: "Week not found"
            })
        }

        await Week.findByIdAndDelete(weekId)

        return res.json({
            success: true,
            message: "Week deleted successfully"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export {addweek,getweek,getweekbyid,updateweek,deleteweek}