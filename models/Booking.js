const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    address: { type: String, required: true, trim: true },
    service: {
      type: String,
      required: true,
      enum: [
        "RO Repair",
        "RO Installation",
        "RO Cleaning",
        "RO Replacement",
        "RO Maintenance"
      ]
    },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    message: { type: String, trim: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Technician Assigned", "Completed", "Cancelled"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);