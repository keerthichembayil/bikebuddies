const mongoose = require("mongoose");

const bikeSchema = mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    model: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    type: { type: String, required: true },
    rate: { type: Number, required: true },
    availability: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bike", bikeSchema);