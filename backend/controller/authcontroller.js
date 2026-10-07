 import user from "../models/user.js";
 import jwt from "jsonwebtoken"
 import bcrypt from "bcrypt"

 const generatetoken = (userId)=>{
    return jwt.sign(
        {
            userId,
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn:"1d",
        }
    )
 }



  export const register = async(req , res)=>{
    try {
         const{ name , email, password}= req.body
         const normalemail = email.toLowerCase().trim()

         const existinguser = await user.findOne({
            email:normalemail
         })
         if(existinguser){
            return res.status(404).json({
                message:"email already taken"
            })
        }
        const hashedpassword = await bcrypt.hash(password,10)
        const User = await user.create({
            name:name.trim(),
            email:normalemail,
            password:hashedpassword
        })
        const token = generatetoken(User._id)
        return res.status(201).json({
            message:"registration successfull",
            token,
            User:{
                id:User._id,
                name:User.name,
                email:User.email

            }
        })
    } catch (error) {
        return res.status(500).json({
            message:"server error"
        })
        
    }
 }

  export const login = async(req , res)=>{
    try {
        const{email, password}=req.body
        const normalemail =email.toLowerCase().trim()

        const User = await user.findOne({
            email:normalemail
        })
        if(!User){
            return res.status(404).json({
                message:"invalid email"
            })
        }
        const matchpassword = await bcrypt.compare(password,User.password)

        if(!matchpassword){
            return res.status(404).json({
                message:"invalid password"
            })
        }

        const token = generatetoken(User._id)
        return res.status(200).json({
            message:"login successfully",
            token,
            User:{
                id:User._id,
                name:User.name,
                email:User.email
            }
        })
    } catch (error) {
        console.log("logib error")
        return res.status(500).json({
            message:"server error"
        })
    }
}