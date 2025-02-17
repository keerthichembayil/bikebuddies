const express=require("express");
require('dotenv').config();
const cors=require("cors");
const connectDB=require("./config/db");
connectDB();
const userRoutes=require("./routes/userRoutes");
const bikeRoutes = require("./routes/bikeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app=express();
const PORT=process.env.PORT||5000;
app.use(cors());
app.use(express.json());
app.use("/api/users",userRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/bookings", bookingRoutes);
// app.get("/",(req,res)=>{
//     res.send("bike buddies backend runnig");
// });



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});