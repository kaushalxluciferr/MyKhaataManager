import mongoose from "mongoose";

const spendingSchema = new mongoose.Schema({
    weekId: { type: mongoose.Schema.Types.ObjectId, ref: 'Week', required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Spending=mongoose.model("Spending",spendingSchema)