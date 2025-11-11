
import mongoose from "mongoose";


const CardSchema=new mongoose.Schema(
    {
     
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim:true },
    anime:{type:String,required:true,trim:true},
    power:{type:String,required:true,trim:true},
    thumbnail:{
      id:String,
      url:String,
    },


  
  },
  { timestamps: true },
)

export const Cards=mongoose.model("Cards",CardSchema)