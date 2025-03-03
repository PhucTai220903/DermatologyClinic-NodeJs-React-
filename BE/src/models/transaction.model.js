const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order_id: {type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true},
    amount: {type: Number, required: true},
    points_earned: {type: Number, required: true},
    points_used:{type:Number, required: true},
    payment_method: { type: String, enum: ["cash", "e-wallet"], required: true },
    status: { type: String, enum: ["refund", "completed", "cancelled","considering_refund","refund_successfully"], default:"completed", required: true }
},{ timestamps: true });

const Transaction = mongoose.model("Transaction",TransactionSchema);
module.exports = Transaction;