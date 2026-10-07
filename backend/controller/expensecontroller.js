import mongoose from "mongoose";
import expense from "../models/expense.js";

const category=[
    "food",
    "utilities"
]
const getexpense = async(req , res)=>{
    try {
        const expens = await expense.find({
            userId:req.userId,

        }).sort({date:-1})

        return res.status(200).json(expens)
    } catch (error) {
        console.log("get expense error")
        res.status(404).json({
            message:"failed to fetch"
        })
    }
}


 export const createexpense = async(req , res)=>{
    try {
         const
        const expens = await expense.find({
            userId:req.userId,

        }).sort({date:-1})

        return res.status(200).json(expens)
    } catch (error) {
        console.log("get expense error")
        res.status(404).json({
            message:"failed to fetch"
        })
    }
}