const express = require("express");
const { addBike } = require("../controllers/bikeController");
const{protect,authorize}=require("../middleware/authMiddleware")
const router = express.Router();
router.post("/add",protect,authorize("owner"), addBike);

module.exports = router;
