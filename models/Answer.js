import mongoose from "mongoose";

const AnswersSchema= new mongoose.Schema({
    productId:{
        type:mongoose.Types.ObjectId,
        ref:"Questions",
    },
    answers:{
        type:String,
    },
},{timestamps:true})

export default mongoose.model("Answers",AnswersSchema)
