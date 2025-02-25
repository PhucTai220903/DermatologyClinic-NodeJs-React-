const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    quantity: {
        type: Number, required: true
    },
});  

const Medicine = mongoose.model("Medicine", MedicineSchema);
module.exports = Medicine;
