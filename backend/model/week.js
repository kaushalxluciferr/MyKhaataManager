import mongoose from "mongoose";

const weekSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    weekName: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Week=mongoose.model("Week",weekSchema)