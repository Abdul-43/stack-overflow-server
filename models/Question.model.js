import mongoose from "mongoose"

const questionsSchema= new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        body:{
            type:String,
            required:true,
            timestamps:true,
        },
        answers:[{
            type:mongoose.Types.ObjectId,
            ref:"Answers"
        },],

    },
    {timestamps:true}
)
export default mongoose.model("Questions",questionsSchema);