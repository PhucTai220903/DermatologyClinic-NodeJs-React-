const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "User"
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "User"
    },
    date: {
        type: Date,  
        default: Date.now,
        required: true 
    },
    status: {
        type: String,
        enum: ["confirmed", "canceled", "completed"],
        default: "confirmed"
    },
    notes: { type: String }
}, { timestamps: true });  

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
