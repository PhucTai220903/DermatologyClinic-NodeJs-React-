const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    doctor_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["confirmed", "canceled", "completed", "move_to_queue", "examined"],
      default: "confirmed",
    },
    notes: { type: String },
    medical_record_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medical_Record",
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
