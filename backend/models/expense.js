
import { type } from "@testing-library/user-event/dist/type";
import mongoose from "mongoose";

 const expenseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    amount:{
        type:Number,
        required:true,
        min:0
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
 },{
    timestamps:true
 })

 const expense = mongoose.model("Expense",expenseSchema)
  export default expense