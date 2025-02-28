// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//     customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     products: {
//         type: [
//             {
//                 product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
//                 quantity: { type: Number, required: true },
//                 price: {type: Number, required: true}
//             }
//         ],
//         required: true
//     },
//     total_amount: {type: Number, required: true},
//     discount_applied: {type: Number, required: true},
//     final_amount: {type: Number, required: true},
//     payment_method: {type: String, enum:["cash", "e-wallet"], default: "cash", required: true},
//     status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending", required: true }
// },{timestamps: true});

// const Order = mongoose.model("Order", orderSchema);
// module.exports = Order;