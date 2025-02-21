const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    age: { type: Number, required: true, min: 0 },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    role: { 
        type: String, 
        enum: ["customer", "admin", "doctor", "pharmacist"], 
        required: true ,
    },
    membership: {
        level: { 
            type: String, 
            enum: ["gold", "silver", "bronze", "member"], 
            default: "member" 
        },
        points: { type: Number, default: 0 },
        total_spent: { type: Number, default: 0 },
        last_transaction: { type: Date, default: null }
    },
    status: { 
        type: String, 
        enum: ["active", "banned"], 
        default: "active" 
    },
    failed_appointments: { type: Number, default: 0 },
    medical_records: [{ type: mongoose.Schema.Types.ObjectId, ref: "MedicalRecord" }]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
