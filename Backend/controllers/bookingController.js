const Booking = require("../models/Booking");
// Create a booking
const createBooking = async (req, res) => {
const { bikeId, customerId, startTime, endTime, luggageOption, paymentStatus, totalCost } = req.body;
try {
const booking = await Booking.create({
bikeId,
customerId,
startTime,
endTime,
luggageOption,
paymentStatus,
totalCost,
});
res.status(201).json(booking);
} catch (error) {
res.status(500).json({ message: error.message });
}
};
module.exports = { createBooking };
