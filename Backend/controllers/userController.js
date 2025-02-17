const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer=require('nodemailer');
const crypto=require('crypto');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service (e.g., 'gmail', 'yahoo', 'outlook')
    auth: {
      user: process.env.Email, // Your email address
      pass:process.env.password   // Your email password or App Password (if 2FA is enabled)
    }
  });
  const generateOTP=()=>{
    return crypto.randomInt(100000, 1000000);
  }
  const sendOtpEmail=async(email,otp)=>{
    const mailOptions = {
        from: process.env.Email,      // Sender's email address
        to: email, // Receiver's email address
        subject: 'otp verification for bike buddies',
        text: `your otp is ${otp} will expire in 10 minutes`
      
      };
      await transporter.sendMail(mailOptions);
  }
const registerUser=async(req,res)=>{
    const{name,email,password,phone,role}=req.body
    const otp=generateOTP();
    const otpExpiration=Date.now()+10*60*1000;
    //otp expires in 10 minutes
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role,
            otp,
            otpExpiration
        })
        await newUser.save();

        await sendOtpEmail(email,otp);
        console.log('OTP',otp);
        res.status(201).json({
            message:"User registered sucessfully ,Please check your email for the otp"
        })


    }

    catch(error)
    {
        res.status(500).json({message:error.message})

    }
}
const loginUser=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user)
        {
            return res.status(404).json({message:"User not found"});
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(!isPasswordValid)
        {
            return res.status(401).json({message:"invalid password"})
        }
        const token=jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"

            }
        )
        res.status(200).json({token,user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        }})
    }
    catch(error)
    {
        res.status(500).json({message:error.message});
    }
    
}
const verifyotp=async(req,res)=>{
    const{email,otp}=req.body;
    console.log(req.body);
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({message:'user not found'});

        }
        if(user.otpExpiration<Date.now())
        {
            return res.status(400).json({message:'otp has expired please request new'});
        }
        if(user.otp!==otp)
        {
            return res.status(400).json({message:'invalid otp'});
        }
        user.isverified=true;
        await user.save();
        res.status(200).json({message:'otp verifed sucessfully'});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }

}
module.exports={loginUser,registerUser,verifyotp};