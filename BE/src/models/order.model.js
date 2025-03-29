const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [
        {
          item_id: { type: mongoose.Schema.Types.ObjectId, required: true },
          item_name: { type: String, required: true },
          type: {
            type: String,
            enum: ["medicine", "comestic", "treatment"],
            required: true,
          },
          quantity: { type: Number },
          price: { type: Number, required: true },
        },
      ],
      required: true,
    },
    total_amount: { type: Number, required: true },
    discount_applied: { type: Number, required: true },
    final_amount: { type: Number, required: true },
    address: { type: String },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
