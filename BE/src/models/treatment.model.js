const mongoose = require("mongoose");

const TreatementSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    }
});  

const Treatment = mongoose.model("Treatment", TreatementSchema);
module.exports = Treatment;
