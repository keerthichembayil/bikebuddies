const jwt=require('jsonwebtoken');
const User=require("../models/User");
const protect=async(req,res,next)=>{
    
    try{
        const token=req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({message:"no token provided"});
    }
    // Verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
// Attach user to request
        if (!req.user) {
          return res.status(401).json({ message: 'User not found, authorization denied' });
        }
    
        next();
    }
    catch(error){
        return res.status(401).json({message:"invalid token"})
    }

}

const authorize=(role)=>{
    return(req,res,next)=>{
        if(req.user.role!==role){
            return res.status(403).json({message:"acess denied"});
        }
        next();
    }
}
module.exports={protect,authorize};