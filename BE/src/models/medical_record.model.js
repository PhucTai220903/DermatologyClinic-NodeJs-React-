const mongoose = require("mongoose");

const medical_recordSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    diagnosis: { type: String, required: true },
    prescription: [
        {
            medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine", required: true },
            dosage: { type: String, required: true },
            frequency: { type: String, required: true },
            duration: { type: String, required: true }
        }
    ],
    notes: { type: String }
}, { timestamps: true });

const Medical_Record = mongoose.model("Medical_Record",medical_recordSchema);
module.exports = Medical_Record;