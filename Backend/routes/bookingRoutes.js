const express = require("express");
const { createBooking } = require("../controllers/bookingController");
const { protect, authorize } = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/create",protect,authorize, createBooking);
module.exports = router;