const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    bikeId: { type: mongoose.Schema.Types.ObjectId, ref: "Bike", required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    luggageOption: { type: Boolean, default: false },
    paymentStatus: { type: String, enum: ["prepaid", "postpaid"], required: true },
    totalCost: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);