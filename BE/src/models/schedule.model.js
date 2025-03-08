const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    schedules: [
        {
            schedule_date: { type: Date, required: true },
            status: { type: String, enum: ["available", "cancelled"], default: "available" }
        }
    ]
}, { timestamps: true });

const Schedule = mongoose.model("Schedule", ScheduleSchema);
module.exports = Schedule;
