const express=require("express");
const { registerUser, loginUser, verifyotp } = require("../controllers/userController");
const router=express.Router()
router.post("/register",registerUser)
   router.post("/verifyotp",verifyotp);
    router.post("/login",loginUser)
    module.exports=router;