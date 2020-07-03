const mongoose=require('mongoose')

const Schema=mongoose.Schema

const notesSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    category:{
        
            type:Schema.Types.ObjectId,
            ref:'Category'
       
    },
    
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }

})
const Notes=mongoose.model('Notes',notesSchema)

module.exports=Notes
