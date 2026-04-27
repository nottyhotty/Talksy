import { sendWelcomeEmail } from "../emails/emailHandler.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup =async (req,res) =>{
    
    const{fullName ,email ,password}=req.body

    try{
        if(!fullName|| !email || !password){
            return res.status(400).json({message:"All field are required"})
        }
        if(password.length< 6){
              return res.status(400).json({message:"password must be atleast 6 characters"})
        }

        const emailRegex =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"invalid email format"});
        }

        const user = await User.findOne({email});
         if(user) return res.status(400).json({message:"emailalreadyexists"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        

       const newUser = new User({
        fullName,
        email,
        password: hashedPassword
       });

       if(newUser){

        const savedUser= await newUser.save();
        generateToken(savedUser._id,res);

        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilepic:newUser.profilePic,
        });
        try{
             await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
        } catch(error){
           console.error("Failed to send welcome email:", error);  

        }

       }else{
        res.status(400).json({message:"invalid user data"});
       }

                 
    }catch (error) {
  console.log("ERROR:", error);   // 👈 IMPORTANT
  res.status(500).json({ message: error.message });
}
    
};