const mongoose = require("mongoose");

const ComesticSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    inventory: { type: Number, required: true },
    isHidden: {type: Boolean, default: false }
}, { timestamps: true });

const Comestic = mongoose.model("Comestic",ComesticSchema);

module.exports = Comestic;