const mongoose=require("mongoose");
const userSchema=mongoose.Schema(
    {
        name:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        phone:{type:String,required:true},
        role:{type:String,enum:["customer","owner"],required:true},
        isverified:{type:Boolean,default:false,},
        otp:{type:Number},
        otpExpiration: { type: Date },

    },
    {timestamps:true}
)
module.exports=mongoose.model("User",userSchema);


// save the current time of the document created and also when it was updated
//  in form of a Date by turning it true.-timestamps