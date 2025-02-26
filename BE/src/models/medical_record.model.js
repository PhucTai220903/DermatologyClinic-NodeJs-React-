const mongoose = require("mongoose");

const medical_recordSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    diagnosis: { type: String, required: true },
    prescription: {
        type: [
            {
                item_id: { type: mongoose.Schema.Types.ObjectId, required: true },
                type: { type: String, enum: ["medicine", "comestic", "treatment"], required: true },
                dosage: { type: String, required: true },
                frequency: { type: String, required: true },
                duration: { type: String, required: true }
            }
        ],
        required: false
    },
    notes: { type: String, required: false },
    isHidden: { type: Boolean, required: true, default: false }
}, { timestamps: true });

const Medical_Record = mongoose.model("Medical_Record", medical_recordSchema);
module.exports = Medical_Record;