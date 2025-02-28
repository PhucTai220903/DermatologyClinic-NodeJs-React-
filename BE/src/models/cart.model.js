const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: {
        type:
            [
                {
                    comestic_id: { type: mongoose.Schema.Types.ObjectId, ref: "Comestic", required: true },
                    quantity: { type: Number, required: true }
                }
            ],
        required: true
    }
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;