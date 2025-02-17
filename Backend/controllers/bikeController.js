const Bike=require("../models/Bike");
//add a bike
const addBike = async (req, res) => {
    // Extract ownerId from authenticated user's token
    const ownerId = req.user.id; // Or req.user._id based on how you store it
    const { name, model, registrationNumber, type, rate ,availability} = req.body;
    try {
    const bike = await Bike.create({
    ownerId,
    name,
    model,
    registrationNumber,
    type,
    rate,
    availability
    });
    res.status(201).json(bike);
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
    };
    module.exports={addBike};