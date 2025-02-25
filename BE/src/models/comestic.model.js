const mongoose = require("mongoose");

const comesticSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    isHidden: { type: Boolean, default: false },
    reviews: [
        {
            customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            comment: { type: String, required: true },
            rating: { type: Number, required: true, min: 0, max: 5 },
            createdAt: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

const Cosmetic = mongoose.model("Comestic", comesticSchema);
module.exports = Cosmetic;
